"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { registerPackageRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import ButtonCustom from "../custom/button.custom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
import mainStore from "@/store/main.store";

const RegisterPackage = () => {
  const {
    inforUser,
    setInforUser,
    confirmInforRegister,
    setConfirmInforRegister,
  } = mainStore();

  const form = useCreateForm(registerPackageRule, {
    fullName: inforUser?.fullName || "",
    email: inforUser?.email || "",
    phone: String(inforUser?.phone) || "",
    timeStart: inforUser?.timeStart || new Date(Date.now()),
  });

  async function onSubmit(values: z.infer<typeof registerPackageRule>) {
    setInforUser(values);
    setConfirmInforRegister(true);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <ScrollArea className="h-[320px]">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-BgDark"
                        placeholder="fullname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-BgDark"
                        placeholder="phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-BgDark"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeStart"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Start</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-BgDark hover:bg-BgDark hover:text-white",
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
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>

          <ButtonCustom
            variant="custom"
            type="submit"
            className={`w-full ${!confirmInforRegister ? "animate-pulse" : ""}`}
          >
            Confirm
          </ButtonCustom>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPackage;
