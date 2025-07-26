import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { file, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { UserPlus } from "lucide-react";
import useTownTalk from "@/hooks/use-town-talk";
import useStorage from "@/hooks/use-storage";
import { StoredFile } from "../../../../declarations/storage/storage.did";
import { Principal } from "@dfinity/principal";
import InfoBadge from "../custom/info-badge";
import { useDebounce } from "use-debounce";
import { deleteCookie, setCookie } from "@/lib/utils";
import ImageCropper from "../custom/image-cropper";
import type { Area } from "react-easy-crop";

function ProfilePictureCropper({
  file,
  onChange,
}: {
  file: File;
  onChange: (newFile: File) => void;
}) {
  const [originalImageSrc, setOriginalImageSrc] = useState<
    string | undefined
  >();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isImageCropperOpen, setIsImageCropperOpen] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isMounted) {
          setImageSrc(reader.result as string);
          setOriginalImageSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    return () => {
      isMounted = false;
    };
  }, [file]);

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []);

  async function getCroppedImg(imageSrc: string, crop: Area): Promise<Blob> {
    const image = new window.Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));
    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height,
    );
    return new Promise((resolve) =>
      canvas.toBlob((blob) => blob && resolve(blob), "image/png"),
    );
  }

  const handleCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropClick = async () => {
    if (originalImageSrc && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(
        originalImageSrc,
        croppedAreaPixels,
      ); // <--- Use original
      const croppedFile = new File([croppedBlob], file.name, {
        type: file.type,
      });
      onChange(croppedFile);

      const previewURL = URL.createObjectURL(croppedBlob);
      setImageSrc(previewURL);

      setIsImageCropperOpen(false);
    }
  };

  if (!imageSrc) return null;

  return (
    <div className="flex w-[400px] flex-col items-center overflow-y-auto bg-gray-800">
      {isImageCropperOpen ? (
        <div className="flex flex-col items-center space-y-4">
          <ImageCropper
            imageSrc={originalImageSrc}
            onCropComplete={handleCropComplete}
            aspect={1}
          />

          <Button
            variant="default"
            onClick={handleCropClick}
            type="button"
            className="z-[9999999]"
          >
            Crop
          </Button>
        </div>
      ) : (
        <img
          src={imageSrc}
          className="aspect-square object-contain"
          // onClick={() => setIsImageCropperOpen(true)}
        />
      )}
    </div>
  );
}

export default function AccountCreationDialog({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [isAccountCreationLoading, setIsAccountCreationLoading] =
    useState<boolean>(false);
  const [isCheckingValidityLoading, setIsCheckingValidityLoading] =
    useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { actor, townTalkAccountIDCookieKey, setIsAuth } = useTownTalk();
  const { storageCanisterID } = useStorage();

  const schema = z.object({
    username: z
      .string()
      .min(6, { message: "The minimum length of username is 6." })
      .max(30, { message: "The maximum length of username is 30." }),
    profile_picture: z
      .file()
      .refine((file) => file.size <= 10 * 1024 * 1024, {
        message: "Profile picture size must be under 10 MB.",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed (e.g., PNG, JPEG).",
      })
      .optional(),
    private: z.boolean(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      profile_picture: undefined,
      private: false,
    },
  });

  const [debouncedUsername] = useDebounce(form.watch("username"), 600);

  const checkAccountCreationValidity = useCallback(async () => {
    setIsCheckingValidityLoading(true);
    try {
      if (actor) {
        const isAccountValid = await actor.check_validity({
          username: debouncedUsername ?? "",
        });

        setIsValid(isAccountValid);
        form.clearErrors("username");
      } else {
        setIsValid(false);

        form.setError("username", { message: "Username has been taken." });
      }
    } catch (err) {
      console.log("Failed to check validity: ", err);
    } finally {
      setIsCheckingValidityLoading(false);
    }
  }, [debouncedUsername]);

  useEffect(() => {
    checkAccountCreationValidity();
  }, [debouncedUsername]);

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      setIsAccountCreationLoading(true);

      const dummyPrincipal = Principal.anonymous();
      const uploadedProfilePicture = data.profile_picture;
      const profilePicture: [StoredFile] | [] = uploadedProfilePicture
        ? [
            {
              id: "",
              groups: [],
              owner: dummyPrincipal,
              data: uploadedProfilePicture
                ? new Uint8Array(await uploadedProfilePicture.arrayBuffer())
                : [],
              name: uploadedProfilePicture?.name ?? "",
              size: BigInt(uploadedProfilePicture?.size ?? 0),
              mime_type: uploadedProfilePicture?.type ?? "",
              public: true,
              allowed_users: [],
              uploaded_at: "",
            },
          ]
        : [];

      console.log(
        {
          profile: { username: data.username, profile_picture: profilePicture },
          private: data.private,
        },
        Principal.fromText(storageCanisterID ?? "").toString(),
      );

      const account_id = await actor?.create_account(
        {
          profile: {
            username: data.username,
            about: "",
            profile_picture: profilePicture,
          },
          private: data.private,
        },
        Principal.fromText(storageCanisterID ?? ""),
      );

      console.log(account_id);

      if (account_id) {
        setCookie(townTalkAccountIDCookieKey, account_id, 7200, "/");
        setIsAuth(true);
      } else {
        deleteCookie(townTalkAccountIDCookieKey);
        setIsAuth(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setIsAccountCreationLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }

        setIsOpen(open);
      }}
    >
      <DialogPortal>
        <DialogContent className="bg-ow-backgrond p-8">
          <DialogHeader>
            <DialogTitle>Create Your TownTalk Account!</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6"
            >
              <FormField
                disabled={isAccountCreationLoading}
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[0.4fr_0.7fr] grid-rows-1 items-center gap-4">
                    <div className="flex w-full flex-row justify-between">
                      <div className="flex flex-row items-start">
                        <FormLabel className="mr-1">Username</FormLabel>
                        <InfoBadge iconClassName="mr-1 w-3 h-3">
                          <FormDescription>
                            This will be your public username.
                          </FormDescription>
                        </InfoBadge>
                      </div>
                      <FormLabel>: </FormLabel>
                    </div>
                    <Input placeholder="Username" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isAccountCreationLoading || isCheckingValidityLoading}
                name="profile_picture"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <div className="grid grid-cols-[0.4fr_0.7fr] grid-rows-1 items-center gap-4">
                      <div className="flex w-full flex-row justify-between">
                        <div className="flex flex-row items-start">
                          <FormLabel className="mr-1">
                            Profile Picture
                          </FormLabel>
                          <InfoBadge iconClassName="w-3 h-3 mr-1">
                            <FormDescription>
                              This will be your public profile picture.
                            </FormDescription>
                          </InfoBadge>
                        </div>
                        <FormLabel>: </FormLabel>
                      </div>
                      <Input
                        placeholder="Profile Picture"
                        type="file"
                        accept="image/*"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </div>

                    {field.value && (
                      <ProfilePictureCropper
                        file={field.value}
                        onChange={field.onChange}
                      />
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isAccountCreationLoading || isCheckingValidityLoading}
                name="private"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[0.4fr_0.7fr] grid-rows-1 items-center gap-4">
                    <div className="flex w-full flex-row justify-between">
                      <div className="flex flex-row items-start">
                        <FormLabel className="mr-1">Private</FormLabel>
                        <InfoBadge iconClassName="h-3 w-3 mr-1">
                          <FormDescription>
                            Whether or not users need to follow your account to
                            see your activities.
                          </FormDescription>
                        </InfoBadge>
                      </div>
                      <FormLabel>: </FormLabel>
                    </div>
                    <Checkbox
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={
                  isAccountCreationLoading ||
                  isCheckingValidityLoading ||
                  !isValid
                }
                className="flex flex-row items-center space-x-2"
                variant="default"
                type="submit"
              >
                <UserPlus className="h-4 w-4" />
                <p>Create Account</p>
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
