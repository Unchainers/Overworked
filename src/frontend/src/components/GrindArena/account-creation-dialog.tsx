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
import useGrindArena from "@/hooks/user-grind-arena";

export default function AccountCreationDialog({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [isAccountCreationLoading, setIsAccountCreationLoading] =
    useState<boolean>(true);
  const [isCheckingValidityLoading, setIsCheckingValidityLoading] =
    useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { actor, grindArenaAccountIDCookieKey, setAuth, isAuth } =
    useGrindArena();
  const { storageCanisterID } = useStorage();

  const schema = z.object({
    username: z
      .string()
      .min(6, { message: "The minimum length of username is 6." })
      .max(30, { message: "The minimum length of username is 6." }),
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

  const debouncedUsername = useDebounce(form.watch("username"), 600);

  const checkAccountCreationValidity = useCallback(async () => {
    setIsCheckingValidityLoading(true);
    try {
    } catch {
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

      const account_id = await actor?.create_account(
        {
          username: data.username,
          profile_picture: profilePicture,
        },
        storageCanisterID!,
      );

      if (account_id) {
        setCookie(grindArenaAccountIDCookieKey, account_id, 7200, "/");
        setAuth(true);
      } else {
        deleteCookie(grindArenaAccountIDCookieKey);
        setAuth(false);
      }
    } catch {
    } finally {
      setIsAccountCreationLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setIsOpen(open)}>
      <DialogPortal>
        <DialogContent className="bg-ow-backgrond p-6">
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
                  <FormItem className="grid grid-cols-[0.4fr_0.7fr] grid-rows-1 items-center gap-4">
                    <div className="flex w-full flex-row justify-between">
                      <div className="flex flex-row items-start">
                        <FormLabel className="mr-1">Profile Picture</FormLabel>
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
