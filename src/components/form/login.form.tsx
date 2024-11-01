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
import { emailRule, loginRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import ButtonCustom from "../custom/button.custom";
import { AuthenApis } from "@/services/auth.service";
import { localStorageKey } from "@/constants/localStorage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import WaitingLayout from "../layout/waiting.layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebases/firebase";
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
import { Button } from "../ui/button";

type typeResult = {
  status?: number | string;
  message?: string;
  data?: any;
};

const LoginForm: React.FC<{ role: string }> = ({ role }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useCreateForm(loginRule, {
    account: "",
    password: "",
  });

  const formPassword = useCreateForm(emailRule, {
    email: "",
  });

  async function onSubmitPassword(values: z.infer<typeof emailRule>) {
    setIsLoading(true);

    const resultReset = await AuthenApis.resetPassword(values.email);
    if (resultReset?.status === 200) {
      toast.info(
        "Email confirmed successfully! Please check your inbox for further instructions to complete the process."
      );
    } else {
      toast.error(resultReset?.message);
    }
    setIsLoading(false);
  }

  async function onSubmit(values: z.infer<typeof loginRule>) {
    setIsLoading(true);
    try {
      const result = await AuthenApis.login(values, role);
      if (result?.status === "200") {
        localStorage.setItem(localStorageKey.accessToken, result?.access_token);
        localStorage.setItem(
          localStorageKey.refreshToken,
          result?.refresh_token
        );
        localStorage.setItem(localStorageKey.role, role);
        localStorage.setItem(localStorageKey.userId, result?.id);

        const userRef = collection(db, "rooms");

        const q = query(userRef, where("user", "==", result?.id));
        // console.log("userLocal>>>", userLocal);
        // const querySnapshot = getDocs(q);
        // console.log("arr>>>", querySnapshot);
        // const theUser = querySnapshot?.docs[0].data() || null;
        // console.log(theUser);
        await getDocs(q)
          .then((querySnapshot) => {
            const rooms = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));

            localStorage.setItem(
              localStorageKey.roomId,
              rooms.length > 0 ? rooms[0].id : ""
            );
          })
          .catch((err) => {
            console.error("Error fetching room data:", err);
          });
        toast.success("Đăng nhập thành công! Chào mừng bạn trở lại!");

        if (role === "admin" || role === "trainee") {
          router.push("/admin");
        } else if (role === "user") {
          router.push("/");
        }
      } else {
        toast.error(result?.message);
        setIsLoading(false);
      }
    } catch (e) {
      toast.error(result?.message);
    }
  }

  return (
    <div>
      {isLoading && <WaitingLayout />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem className="text-shadow">
                  <FormLabel>Tài khoản</FormLabel>
                  <FormControl>
                    <Input
                      className="text-Dark"
                      placeholder="Tên tài khoản hoặc email"
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
                  <FormLabel>Mật khẩu</FormLabel>
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
            Đăng nhập
          </ButtonCustom>
        </form>
      </Form>
      <div className="w-full my-3 text-center">
        <Dialog>
          <DialogTrigger>
            <Button variant={"ghost"}>Quên mật khẩu</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quên mật khẩu? Đặt lại mật khẩu</DialogTitle>
              <DialogDescription>
                Vui lòng nhập email của bạn để nhận một email và đặt lại mật
                khẩu
              </DialogDescription>
            </DialogHeader>
            <Form {...formPassword}>
              <form
                onSubmit={formPassword.handleSubmit(onSubmitPassword)}
                className="space-y-8"
              >
                <FormField
                  control={formPassword.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <DialogClose>
                    <Button variant={"secondary"} className="mr-2">
                      Huỷ
                    </Button>
                  </DialogClose>
                  <Button type="submit">Xác nhận</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LoginForm;
