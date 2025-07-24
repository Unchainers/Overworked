import { useState } from "react";
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

  const { actor } = useTownTalk();
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

  async function checkAccountCreationValidity() {
    try {
    } catch {
    } finally {
    }
  }

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
      const account_id = actor?.create_account(
        {
          profile: { username: data.username, profile_picture: profilePicture },
          private: data.private,
        },
        storageCanisterID!,
      );
    } catch {
    } finally {
      setIsAccountCreationLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setIsOpen(open)}>
      <DialogPortal>
        <DialogHeader>
          <DialogTitle>Create Your TownTalk Account!</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                disabled={isAccountCreationLoading}
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <FormLabel>Username: </FormLabel>
                    <Input placeholder="Username" {...field} />
                    <FormDescription>
                      This will be your public username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isAccountCreationLoading || isCheckingValidityLoading}
                name="profile_picture"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <FormLabel>Username: </FormLabel>
                    <Input
                      type="file"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                    <FormDescription>
                      This will be your public profile picture.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isAccountCreationLoading || isCheckingValidityLoading}
                name="private"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <Checkbox
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                    <FormLabel>Private Account</FormLabel>
                    <FormDescription>
                      Whether or not users need to follow your account to see
                      your activities.
                    </FormDescription>
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
