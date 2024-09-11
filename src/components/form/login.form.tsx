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
import { loginRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import ButtonCustom from "../custom/button.custom";
import LinkCustom from "../custom/link.custom";
import { AuthenApis } from "@/services/auth.service";
import { localStorageKey } from "@/constants/localStorage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HeroSection from "../normal/heroSection.component";
import WaitingLayout from "../layout/waiting.layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebases/firebase";

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

  async function onSubmit(values: z.infer<typeof loginRule>) {
    setIsLoading(true);
    try {
      const result = await AuthenApis.login(values, role);
      console.log("result>>", result);
      if (result?.status === "200") {
        console.log("success");
        localStorage.setItem(localStorageKey.accessToken, result?.access_token);
        localStorage.setItem(
          localStorageKey.refreshToken,
          result?.refresh_token
        );
        localStorage.setItem(localStorageKey.userId, result?.id);

        const userRef = collection(db, "rooms");

        const q = query(userRef, where("user", "==", result?.id));
        // console.log("userLocal>>>", userLocal);
        // const querySnapshot = getDocs(q);
        // console.log("arr>>>", querySnapshot);
        // const theUser = querySnapshot?.docs[0].data() || null;
        // console.log(theUser);
        getDocs(q)
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
        setIsLoading(false);
      } else {
        toast.error(result?.message);
        setIsLoading(false);
      }

      if (role === "admin") {
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
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

          <div className="w-full text-center">
            <LinkCustom
              href="/forgot-password"
              className="text-shadow"
              text="Forgot password"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
