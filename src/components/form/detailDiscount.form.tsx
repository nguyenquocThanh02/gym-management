"use client";
import React, { use, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { deviceRule, discountRule } from "@/formSchema/formSchema";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarCustom } from "../custom/calendar.custom";
import { typeDiscount } from "@/types/discount.type";
import { DiscountApis } from "@/services";
import { typePackageName } from "@/types";
import { Checkbox } from "../ui/checkbox";

const DetailsDiscountForm: React.FC<{
  data: typeDiscount | null;
  packages: typePackageName[];
  id: string | null;
}> = ({ data, packages, id = "" }) => {
  const [status, setStatus] = React.useState<string>(data?.status || "");
  const [isLoading1, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const form = useCreateForm(discountRule, {
    name: data?.name || "",
    validFrom: data?.validFrom || "",
    validTo: data?.validTo || "",
    percent: data?.percent || 0,
    description: data?.description || "",
    packages: data?.packages || [],
  });

  async function onSubmit(values: z.infer<typeof discountRule>) {
    setIsLoading(true);

    console.log("ngày: ", values.validFrom);
    console.log("format: ", new Date(values.validFrom));

    const dataAddDiscount: typeDiscount = {
      name: values?.name,
      validFrom: new Date(values.validFrom),
      validTo: new Date(values.validTo),
      percent: values?.percent || 0,
      description: values?.description || "",
      packages: values?.packages || [],
    };

    console.log(dataAddDiscount);

    if (!id) {
      try {
        const result = await DiscountApis.addDiscount(dataAddDiscount);
        if (result?.status === "201") {
          toast.success("Add new discount successfully");
          form.reset();
        } else {
          toast.error(result?.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }
    } else {
      try {
        const result = await DiscountApis.updateDiscount(id, dataAddDiscount);
        if (result?.status === "200") {
          toast.success("Update discount successfully");
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
      const idDiscount = id || "";
      const statusChange = status === "active" ? "stop" : "active";
      const result = await DiscountApis.changeStatusDiscount(
        idDiscount,
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

      <div className="flex justify-between mb-2 packages-center">
        <div>
          {id ? (
            <h3>
              Status:{" "}
              <Badge
                className={`${
                  status === "active" ? "bg-green-800" : "bg-Primary"
                }`}
              >
                {status === "active" ? "running" : "stopped"}
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
                    {status === "active" ? "stopped" : "run"} the discount?
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
        <form className="flex gap-8 flex-wrap justify-center">
          <div className="flex-1 min-w-80 shadow-lg p-1 border rounded-lg">
            <ScrollArea className="h-[70vh] w-full">
              <div className="p-4 flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Discount middle month" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid From</FormLabel>
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
                            fromYear={2023}
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
                  name="validTo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid To</FormLabel>
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
                            fromYear={2023}
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
                  name="percent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Percent (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10, 20, ..."
                          {...field}
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
                      <FormLabel>Description </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Sale middle month ..."
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
          <div className="">
            <FormField
              control={form.control}
              name="packages"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Apply for:</FormLabel>
                    <FormDescription>
                      Select the packages you want to apply this discount.
                    </FormDescription>
                  </div>
                  {packages &&
                    packages?.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="packages"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row packages-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default DetailsDiscountForm;
