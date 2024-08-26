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
import { deviceRule } from "@/formSchema/formSchema";
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
import { typeDevice } from "@/types";
import { DeviceApis } from "@/services";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarCustom } from "../custom/calendar.custom";

const DetailsDeviceForm: React.FC<{
  data: typeDevice | null;
  id: string | null;
}> = ({ data, id = "" }) => {
  const [status, setStatus] = React.useState<string>(data?.status || "");
  const [urlImage, setUrlImage] = React.useState<string>(data?.image || "");
  const [file, setFile] = React.useState("");

  const [isLoading1, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleSelectImage = (value) => {
    setFile(value);
    setUrlImage(URL.createObjectURL(value));
  };

  const form = useCreateForm(deviceRule, {
    name: data?.name || "",
    type: data?.type || "",
    lastMaintenance: data?.lastMaintenance || "",
    purchaseDate: data?.purchaseDate || "",
    maintenanceInterval: data?.maintenanceInterval || 0,
    description: data?.description || "",
    serialNumber: data?.serialNumber || "",
  });

  async function onSubmit(values: z.infer<typeof deviceRule>) {
    setIsLoading(true);
    let linkImg: string = "";
    if (file) {
      const storageRef = ref(storage, "images/" + file?.name);
      await uploadBytes(storageRef, file);
      linkImg = await getDownloadURL(storageRef);
    }
    const dataAddDevice: typeDevice = {
      name: values?.name || "",
      type: values?.type || "",
      lastMaintenance: values?.lastMaintenance
        ? new Date(values.lastMaintenance)
        : undefined,
      purchaseDate: values?.purchaseDate
        ? new Date(values.purchaseDate)
        : undefined,
      maintenanceInterval: values?.maintenanceInterval
        ? Number(values.maintenanceInterval)
        : undefined,
      image: linkImg || urlImage || "",
      description: values?.description || "",
      serialNumber: values?.serialNumber || undefined,
    };

    console.log(dataAddDevice);

    if (!id) {
      try {
        const result = await DeviceApis.addDevice(dataAddDevice);
        if (result?.status === "201") {
          toast.success("Add new device successfully");
          form.reset();
          setFile("");
          setUrlImage("");
        } else {
          toast.error(result?.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }
    } else {
      try {
        const result = await DeviceApis.updateDevice(dataAddDevice, id);
        if (result?.status === "200") {
          toast.success("Update device successfully");
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
      const idDevice = id || "";
      const statusChange = status === "available" ? "maintenance" : "available";
      const result = await DeviceApis.changeStatusDevice(
        idDevice,
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
      <h4 className="text-center text-2xl font-semibold text-shadow">
        {id ? "Update Device" : "Add Device"}
      </h4>
      <div className="flex justify-between mb-2 items-center">
        <div>
          {id ? (
            <h3>
              Status:{" "}
              <Badge
                className={`${
                  status === "available" ? "bg-green-800" : "bg-yellow-500"
                }`}
              >
                {status}
              </Badge>
            </h3>
          ) : (
            ""
          )}
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
                    {status === "available" ? "maintainence" : "available"} the
                    device
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
            className="py-1"
          >
            Save all
          </ButtonCustom>
        </div>
      </div>
      <Form {...form}>
        <form className="flex gap-5 flex-wrap justify-center">
          <div className="w-full md:w-[600px] min-h-[70vh] shadow-lg p-5 border rounded-lg flex flex-col items-center">
            <div className="relative w-full mx-auto h-full rounded-lg overflow-hidden flex justify-center items-center border-dashed border-2 border-slate-400">
              {urlImage && (
                <Image
                  src={urlImage}
                  alt="image-profile"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              )}
              <div className="z-10 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-Light/50 opacity-0 hover:opacity-100">
                <FileInputCustom onFileSelect={handleSelectImage} />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-80 shadow-lg p-1 border rounded-lg">
            <ScrollArea className="h-[70vh] w-full">
              <div className="p-4 flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dumbell" {...field} />
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
                        <Input placeholder="Cardio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Purchase Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarCustom
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromYear={1960}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastMaintenance"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Last maintenance</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarCustom
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromYear={2000}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maintenanceInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance interval</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial number </FormLabel>
                      <FormControl>
                        <Input placeholder="s2000d3" {...field} />
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
                      <FormLabel>Description *</FormLabel>
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
            </ScrollArea>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DetailsDeviceForm;
