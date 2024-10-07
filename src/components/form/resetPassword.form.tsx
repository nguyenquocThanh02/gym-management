"use client";
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
import { z } from "zod";
import { resetPasswordRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import ButtonCustom from "../custom/button.custom";
import { AuthenApis } from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import WaitingLayout from "../layout/waiting.layout";

import { typeCreatePassword } from "@/types";

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useCreateForm(resetPasswordRule, {
    password: "",
    confirmPassword: "",
  });

  async function onSubmit(values: z.infer<typeof resetPasswordRule>) {
    setIsLoading(true);
    const dataCreatePassword: typeCreatePassword = {
      password: values?.password,
      resetToken: token,
    };
    console.log(dataCreatePassword);
    const result = await AuthenApis.createPassword(dataCreatePassword);
    if (result?.status === 200) {
      toast.success("Reset password successfully");
      if (result?.data?.role === "admin") {
        router.push("/login-admin");
      } else if (result?.data?.role === "trainee") {
        router.push("/login-trainee");
      } else {
        router.push("/login");
      }
    } else {
      toast.error(result?.message);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <WaitingLayout />;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-shadow">
                  <FormLabel>Password</FormLabel>
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
                  <FormLabel>Confirm Password</FormLabel>
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
          </div>

          <ButtonCustom type="submit" className="w-full">
            Reset Password
          </ButtonCustom>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
