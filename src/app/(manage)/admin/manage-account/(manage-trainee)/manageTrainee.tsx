"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { typeAccount } from "@/types";
import { UserApis } from "@/services";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import ButtonCustom from "@/components/custom/button.custom";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import { emailRule } from "@/formSchema/formSchema";
import { z } from "zod";
import { toast } from "sonner";

const ManageTrainee = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoadingInvite, setIsLoadingInvite] = React.useState<boolean>(false);

  const { data, isLoading } = useQuery<any>({
    queryKey: ["trainees"],
    queryFn: UserApis.getAllRoleTrainee,
    staleTime: 5 * 60 * 1000,
  });

  const arrs: typeAccount[] = data?.data || [];

  const form = useCreateForm(emailRule, {
    email: "",
  });

  async function onSubmit(values: z.infer<typeof emailRule>) {
    setIsLoadingInvite(true);
    console.log(values);
    try {
      const result = await UserApis.inviteAccount(values?.email);
      console.log("result>>", result);
      if (result?.status === "200") {
        toast.success("Invite successfully");
        form.reset();
        setOpen(false);
      } else {
        toast.error(result?.message);
      }
    } catch (e) {
      toast.error(result?.message);
    }
    setIsLoadingInvite(false);
  }
  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Trainees</CardTitle>
              <CardDescription>Manage your trainees.</CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                  Invite account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Status</DialogTitle>
                  <DialogDescription>
                    <Form {...form}>
                      <form className="space-y-8">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="abc@gmail.com"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Invite
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={arrs} />{" "}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTrainee;
