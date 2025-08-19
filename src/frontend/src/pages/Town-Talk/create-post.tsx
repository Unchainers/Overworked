import MultiFileUpload from "@/components/custom/multi-file-upload";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function CreatePost() {
  const schema = z
    .object({
      caption: z.string(),
      medias: z.array(z.file()),
    })
    .refine((arg) => arg.caption.length || arg.medias.length, {
      message: "A caption or at least one media has to be provided.",
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      caption: "",
      medias: [],
    },
  });

  async function onSubmit() {}

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="medias"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel htmlFor="medias">Medias:</FormLabel>
                <MultiFileUpload
                  onFileAdd={(file) =>
                    form.setValue("medias", [
                      ...(form.getValues("medias") as File[]),
                      file instanceof File ? file : new File([file], "unnamed"),
                    ])
                  }
                  onFileRemove={(file) =>
                    form.setValue("medias", [
                      ...(form.getValues("medias") as File[]).filter(
                        (f) =>
                          !(
                            f.name === (file as File).name &&
                            f.lastModified === (file as File).lastModified
                          ),
                      ),
                    ])
                  }
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel htmlFor="caption">Caption:</FormLabel>
                <Textarea {...field} placeholder="Caption..." />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
