import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import { articalRule } from "@/formSchema/formSchema";
import { z } from "zod";
import { Button } from "../ui/button";
import { storage } from "@/firebases/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ArticalApis } from "@/services";
import { typeArtical } from "@/types";
import { localStorageKey } from "@/constants/localStorage";
import { toast } from "sonner";
import WaitingLayout from "../layout/waiting.layout";
import { useRouter } from "next/navigation";

const ArticalForm: React.FC<{
  editorData: String;
}> = ({ editorData }) => {
  const route = useRouter();
  const userId = localStorage.getItem(localStorageKey?.userId) || "";
  const [loading, setLoading] = useState<boolean>(false);

  const form = useCreateForm(articalRule, {
    title: "",
    coverImage: "",
    description: "",
  });
  async function onSubmit(values: z.infer<typeof articalRule>) {
    setLoading(true);
    let linkImage: string = "";
    if (values?.coverImage) {
      const storageRef = ref(storage, "images/" + values?.coverImage?.name);
      await uploadBytes(storageRef, values?.coverImage);
      linkImage = await getDownloadURL(storageRef);
    }

    const dataAddArtical: typeArtical = {
      title: values?.title,
      coverImage: linkImage,
      description: values?.description,
      content: editorData,
      userId: userId,
    };

    const result = await ArticalApis.addArtical(dataAddArtical);

    if (result?.status === 201) {
      toast.success("Create a new artical successfuly");
      form.reset();
      route.push("/artical/of-user");
    } else {
      toast.error("Error: ", result?.message);
    }
    setLoading(false);
  }
  if (loading) {
    return <WaitingLayout />;
  }
  return (
    <div>
      <Form {...form}>
        <form className="">
          <div className="p-4 flex flex-col gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Dumbell" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/*, application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Experience training for artist ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center gap-3">
            <Button onClick={form.handleSubmit(onSubmit)} className="py-1">
              Save all
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ArticalForm;
