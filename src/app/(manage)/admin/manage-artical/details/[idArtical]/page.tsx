"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ArticalApis, UserApis } from "@/services";
import { typeArtical } from "@/types";
import { formatDate } from "@/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, TrendingUp, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import { statusChangeArticalRule } from "@/formSchema/formSchema";
import { z } from "zod";

export default function DetailAccount({
  params,
}: {
  params: { idArtical: string };
}) {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-artical",
      name: "Artical management",
    },
    {
      link: "#",
      name: "Details artical",
    },
  ];
  const [open, setOpen] = React.useState<boolean>(false);
  const [openPermiss, setOpenPermiss] = React.useState<boolean>(false);

  const route = useRouter();

  const { data, isLoading, refetch } = useQuery<any>({
    queryKey: ["artical"],
    queryFn: () => ArticalApis.getDetailsArtical(params.idArtical),
  });

  const theArtical: typeArtical = data?.data || null;

  const form = useCreateForm(statusChangeArticalRule, {
    statusChange: theArtical?.status,
  });

  if (isLoading) {
    return <div>Skelonton</div>;
  }

  const handleDelete = async () => {
    const result = await ArticalApis.deleteArtical(params?.idArtical);
    if (result?.status === 200) {
      toast.success("Delete artical successfully");
      route.push("/admin/mange-artical");
    } else {
      toast.error(result?.message);
    }

    setOpen(false);
  };

  async function onSubmit(data: z.infer<typeof statusChangeArticalRule>) {
    const resultChange = await ArticalApis.changeStatusArtical(
      params?.idArtical,
      data?.statusChange
    );
    if (resultChange?.status === 200) {
      toast.success("Change status successfully");
      refetch();
    } else {
      toast.error("Error: ", resultChange?.message);
    }
    setOpenPermiss(false);
  }

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={() => route.back()}>Back</ButtonCustom>
      </div>
      <Card x-chunk="dashboard-06-chunk-0 mt-3">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Articals</CardTitle>
              <CardDescription>Manage your articals.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={openPermiss} onOpenChange={setOpenPermiss}>
                <DialogTrigger asChild>
                  <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                    Change Status
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>Change Status</DialogTitle>
                    <DialogDescription>
                      Select status behind to change status artical.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <Form {...form}>
                      <form className="space-y-6">
                        <FormField
                          control={form.control}
                          name="statusChange"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={theArtical?.status}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a status to change" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="blocked">
                                    blocked
                                  </SelectItem>
                                  <SelectItem value="reviewing">
                                    reviewing
                                  </SelectItem>
                                  <SelectItem value="published">
                                    published
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete artical</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to DELETE the artical?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleDelete}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="l-container bg-Dark/5 rounded-lg py-3">
            <h2 className="text-lg font-bold">{data?.data?.title}</h2>
            <div className="flex justify-between mt-3">
              <div className="flex gap-3">
                <Badge className="text-sm">
                  <Calendar className="mr-1" size={15} />
                  {formatDate(data?.data?.updatedAt)}
                </Badge>
                <Badge className="text-sm">
                  <UserRoundPen className="mr-1" size={15} />
                  {data?.data?.author?.name}
                </Badge>
              </div>
              <div>
                <Badge variant={"destructive"} className="text-sm">
                  <TrendingUp className="mr-1" size={15} />
                  {data?.data?.status}
                </Badge>
              </div>
            </div>
            <hr className="mt-5" />
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: data?.data?.content }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
