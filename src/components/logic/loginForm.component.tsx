"use client";
import React from "react";
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
import { Button } from "../ui/button";
import { z } from "zod";
import { loginRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import ButtonCustom from "../ui/buttonCustom";
import LinkCustom from "../ui/linkCustom";
import { AuthenApis } from "@/services/auth.service";

const LoginForm = () => {
  const form = useCreateForm(loginRule, {
    account: "",
    password: "",
  });

  async function onSubmit(values: z.infer<typeof loginRule>) {
    try {
      const result = await AuthenApis.login({
        email: "thanh@gmail.com",
        password: "123456",
      });
      console.log("thanh", result);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-Background"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-Background"
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ButtonCustom variant="custom" type="submit" className="w-full">
            Login
          </ButtonCustom>

          <div className="w-full text-center">
            <LinkCustom
              href="/forgot-password"
              className=""
              text="Forgot password"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
