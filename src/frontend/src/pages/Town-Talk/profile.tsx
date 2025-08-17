import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Profile() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const schema = z.object({
    username: z
      .string()
      .min(6, { message: "The minimum length of username is 6." })
      .max(30, { message: "The maximum length of username is 30." }),
    bio: z.string(),
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
      bio: "",
      profile_picture: undefined,
      private: false,
    },
  });

  async function fetchProfile() {
    setIsFetching(true);

    try {
    } catch (err) {
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  async function onSubmit() {
    setIsSubmitting(true);

    try {
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            disabled={isFetching || isSubmitting}
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel htmlFor="name">Username:</FormLabel>
                <Input {...field} placeholder="Username..." />
              </FormItem>
            )}
          />

          <FormField
            disabled={isFetching || isSubmitting}
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel htmlFor="name">Bio:</FormLabel>
                <Textarea {...field} placeholder="Bio..." />
              </FormItem>
            )}
          />

          <FormField
            disabled={isFetching || isSubmitting}
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel htmlFor="name">Username:</FormLabel>
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
              </FormItem>
            )}
          />

          <FormField
            disabled={isFetching || isSubmitting}
            control={form.control}
            name="private"
            render={({ field }) => (
              <FormItem className="flex flex-row space-x-2">
                <FormLabel htmlFor="name">Username:</FormLabel>
                <Checkbox
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormItem>
            )}
          />

          <Button disabled={isFetching || isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
