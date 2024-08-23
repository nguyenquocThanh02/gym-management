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
import { z } from "zod";
import { registerRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import ButtonCustom from "../custom/button.custom";
import { PhoneInput } from "../custom/phoneInput.custom";
import { AuthenApis } from "@/services/auth.service";
import { typeRegister } from "@/types/auth.type";

const RegisterForm = () => {
  const form = useCreateForm(registerRule, {
    fullname: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    account: "",
    password: "",
    confirmPassword: "",
  });

  async function onSubmit(values: z.infer<typeof registerRule>) {
    const dataRegister: typeRegister = {
      email: values.email,
      accountName: values.account,
      phone: values.phone,
      password: values.password,
      fullName: values.fullname || "",
      dateOfBirth: values.dateOfBirth || "",
    };
    try {
      const result = await AuthenApis.register(dataRegister);
      console.log("test: ", result);
      console.log("test: ", result?.message);
    } catch (err) {
      console.log("err: ", err);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:flex lg:flex-wrap w-full"
        >
          <div className="lg:w-6/12 px-4 md:px-0">
            <div className=" flex flex-col gap-3 md:mx-12 md:p-0 lg:mx-6 lg:p-12">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="text-shadow">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-Dark"
                        placeholder="Nguyen Van A"
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
                  <FormItem className="text-shadow">
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        className="text-Dark"
                        placeholder="abc@gmail.com"
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
                  <FormItem className="text-shadow">
                    <FormLabel>Phone *</FormLabel>
                    <FormControl className="">
                      <PhoneInput
                        className="text-Dark"
                        placeholder="XXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="text-shadow">
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                      <Input
                        className="text-Dark"
                        placeholder="01/01/1999"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="lg:w-6/12 px-4 md:px-0 ">
            <div className="flex flex-col gap-3 md:mx-12 md:p-0 lg:mx-6 lg:p-12">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem className="text-shadow">
                    <FormLabel>Account Name *</FormLabel>
                    <FormControl>
                      <Input
                        className="text-Dark"
                        placeholder="Account name or email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-shadow">
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        className="text-Dark"
                        type="password"
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="text-shadow">
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input
                        className="text-Dark"
                        type="password"
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonCustom
                // variant="custom"
                type="submit"
                className="w-full mt-4"
              >
                Register
              </ButtonCustom>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
