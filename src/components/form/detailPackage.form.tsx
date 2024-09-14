"use client";
import React, { use, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { deviceRule, packageRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import { CalendarIcon, Divide, Plus } from "lucide-react";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebases/firebase";
import ButtonCustom from "../custom/button.custom";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import WaitingLayout from "../layout/waiting.layout";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import FileInputCustom from "../custom/fileInput.custom";
import { typeDevice, typePackage } from "@/types";
import { DeviceApis, PackageApis } from "@/services";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarCustom } from "../custom/calendar.custom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const DetailsPackageForm: React.FC<{
  data: typePackage | null;
  id: string | null;
}> = ({ data, id = "" }) => {
  const [status, setStatus] = React.useState<string>(data?.status || "");

  const [isLoading1, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const form = useCreateForm(packageRule, {
    name: data?.name || "",
    type: data?.type || "",
    sessionWithPT: data?.sessionWithPT || 0,
    description: data?.description || "",
    suitableFor: data?.suitableFor || "",
    price: data?.price || 0,
    duration: data?.duration || 0,
    stock: data?.stock || 0,
  });

  async function onSubmit(values: z.infer<typeof packageRule>) {
    setIsLoading(true);

    const dataAddPackage: typePackage = {
      name: values?.name || "",
      type: values?.type || "",
      sessionWithPT: values?.sessionWithPT || 0,
      duration: values?.duration || 0,
      price: values?.price || 0,
      stock: values?.stock || 0,
      suitableFor: values?.suitableFor || "",
      description: values?.description || "",
    };

    if (!id) {
      try {
        const result = await PackageApis.addPackage(dataAddPackage);
        if (result?.status === "201") {
          toast.success("Add new package successfully");
          form.reset();
        } else {
          toast.error(result?.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }
    } else {
      try {
        const result = await PackageApis.updatePackage(dataAddPackage, id);
        if (result?.status === "200") {
          toast.success("Update package successfully");
        } else {
          toast.error(result?.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }
    }
    setIsLoading(false);
  }

  const handleChangeStatus = async () => {
    try {
      const idPackage = id || "";
      const statusChange = status === "active" ? "block" : "active";
      const result = await PackageApis.changeStatusPackage(
        idPackage,
        statusChange
      );
      if (result?.status === "200") {
        setStatus(statusChange);
        toast.success("Update status successfully");
      } else {
        toast.error(result?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }
    setOpen(false);
  };

  return (
    <>
      {isLoading1 && <WaitingLayout />}

      <div className="flex justify-between mb-2 items-center">
        <div>
          {id ? (
            <h3>
              Status:{" "}
              <Badge
                className={`${
                  status === "active" ? "bg-green-800" : "bg-Primary"
                }`}
              >
                {status}
              </Badge>
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0 mt-3">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Details Package</CardTitle>
              <CardDescription>Manage your packages.</CardDescription>
            </div>
            <div className="flex gap-3">
              {id && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Change Status</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-black">
                        Change Status
                      </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to{" "}
                        {status === "active" ? "block" : "active"} the package ?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                      <Button type="submit" onClick={handleChangeStatus}>
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              <ButtonCustom
                variant="custom"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save all
              </ButtonCustom>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex gap-5 justify-center">
              <div className="w-full md:w-1/2 shadow-lg p-1 border rounded-lg">
                <div className="p-4 flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Basic package" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="basic" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="$" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sessionWithPT"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sessions with PT</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="session"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time membership</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="days" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Limit</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
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
                  <FormField
                    control={form.control}
                    name="suitableFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Object</FormLabel>
                        <FormControl>
                          <Textarea placeholder="fat, fitness" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default DetailsPackageForm;
