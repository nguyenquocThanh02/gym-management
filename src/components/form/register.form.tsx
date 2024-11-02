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
import { registerRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import ButtonCustom from "../custom/button.custom";
import { PhoneInput } from "../custom/phoneInput.custom";
import { AuthenApis } from "@/services/auth.service";
import { typeRegister } from "@/types/auth.type";
import { toast } from "sonner";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import WaitingLayout from "../layout/waiting.layout";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC<{ invite: string }> = ({ invite = "" }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
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
    setLoading(true);
    const dataRegister: typeRegister = {
      email: values.email,
      accountName: values.account,
      phone: values.phone,
      password: values.password,
      fullName: values.fullname || "",
      dateOfBirth: values.dateOfBirth || "",
      inviteToken: invite || undefined,
    };

    try {
      const result = await AuthenApis.register(dataRegister);
      if (result?.status === "201") {
        if (!invite) {
          // handle chat: create new room and message
          const roomChatsRef = collection(db, "rooms");
          const newRoomChatRef = doc(roomChatsRef);

          console.log(result?.data);
          try {
            await setDoc(newRoomChatRef, {
              createdAt: serverTimestamp(),
              user: result?.data?._id,
              lastMessage: "",
              // timeLastMessage: undefined,
              isSeen: false,
            });

            const newChatRef = doc(db, "messages", newRoomChatRef.id);

            await setDoc(newChatRef, {
              createdAt: serverTimestamp(),
              messages: [],
            });
          } catch (error) {
            toast.warning("Lỗi xảy ra khi tạo tin nhắn");
          }
          toast.success("Đăng ký thành công!");

          router.push("/login");
        } else {
          console.log("thanh cong");
          router.push("/login-trainee");
        }
      } else {
        toast.error(result?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }
    setLoading(false);
  }

  return (
    <div>
      {loading && <WaitingLayout />}
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
                    <FormLabel>Họ và tên</FormLabel>
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
                    <FormLabel>Số điện thoại *</FormLabel>
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
                    <FormLabel>Ngày sinh</FormLabel>
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
                    <FormLabel>Tên tài khoản *</FormLabel>
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
                    <FormLabel>Mật khẩu *</FormLabel>
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
                    <FormLabel>Xác nhận mật khẩu *</FormLabel>
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
                Đăng ký
              </ButtonCustom>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
