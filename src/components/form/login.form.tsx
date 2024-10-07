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
      console.log("success");
    } else {
      console.log("faild");
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
        toast.success("Login successfully");

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
              name="account"
              render={({ field }) => (
                <FormItem className="text-shadow">
                  <FormLabel>Account</FormLabel>
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
          </div>

          <ButtonCustom type="submit" className="w-full">
            Login
          </ButtonCustom>
        </form>
      </Form>
      <div className="w-full my-3 text-center">
        <Dialog>
          <DialogTrigger>
            <Button variant={"ghost"}>Forgot password</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Forgot & reset password</DialogTitle>
              <DialogDescription>
                Lets enter your email to receive a email and reset password
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
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Submit</Button>
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
