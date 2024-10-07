"use client";
import React, { use, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { profileRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebases/firebase";
import ButtonCustom from "@/components/custom/button.custom";
import { toast } from "sonner";
import WaitingLayout from "@/components/layout/waiting.layout";
import { Button } from "@/components/ui/button";
import { UserApis } from "@/services";
import { typeAccount } from "@/types";
import FileInputCustom from "../custom/fileInput.custom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ChangePasswordForm from "./changePasswordForm";
import { formatDate } from "@/utils";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";

const ProfileForm: React.FC<{ data: typeAccount }> = ({ data }) => {
  const [isLoading1, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [urlImage, setUrlImage] = React.useState<string>(data?.avatar || "");
  const [file, setFile] = React.useState("");

  const handleSelectImage = (value) => {
    setFile(value);
    setUrlImage(URL.createObjectURL(value));
  };

  // Initialize the form with the data from the API once it's loaded
  const form = useCreateForm(profileRule, {
    fullName: data?.fullName || "",
    accountName: data?.accountName || "",
    email: data?.email || "",
    phone: String(data?.phone) || "",
    dateOfBirth: data?.dateOfBirth || "",
  });

  async function onSubmit(values: z.infer<typeof profileRule>) {
    setIsLoading(true);
    let linkImg: string = "";
    if (file) {
      const storageRef = ref(storage, "images/" + file?.name);
      await uploadBytes(storageRef, file);
      linkImg = await getDownloadURL(storageRef);
    }
    const dataUpdate: typeAccount = {
      fullName: values?.fullName || "",
      accountName: values?.accountName,
      email: values?.email,
      phone: values?.phone || "",
      dateOfBirth: values?.dateOfBirth || "",
      avatar: linkImg || urlImage || "",
    };

    console.log(dataUpdate);

    const result = await UserApis.updateAccount(data?._id || "", dataUpdate);
    if (result?.status === "200") {
      toast.success("Update account successfully");
    } else {
      toast.error(result?.message);
    }
    setIsLoading(false);
  }

  //   const handleChangeStatus = async () => {
  //     try {
  //       const idDevice = id || "";
  //       const statusChange = status === "available" ? "maintenance" : "available";
  //       const result = await DeviceApis.changeStatusDevice(
  //         idDevice,
  //         statusChange
  //       );
  //       if (result?.status === "200") {
  //         setStatus(statusChange);
  //         toast.success("Update status successfully");
  //       } else {
  //         toast.error(result?.message);
  //       }
  //     } catch (err) {
  //       toast.error(err?.message);
  //     }
  //     setOpen(false);
  //   };

  return (
    <div className="">
      {isLoading1 && <WaitingLayout />}
      <div className="flex justify-end mb-3 mt-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <ButtonCustom variant="custom">Change Password</ButtonCustom>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Change Password</DialogTitle>
              <DialogDescription className="text-center">
                Enter your recent password, then enter a new password and
                confirm the new password to change your password.
              </DialogDescription>
            </DialogHeader>
            <ChangePasswordForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
        <ButtonCustom className="ml-3" onClick={form.handleSubmit(onSubmit)}>
          Update
        </ButtonCustom>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-5 justify-center items-center bg-BgLight/10  py-5 rounded-lg">
          <div className="relative w-52 h-52 mx-auto rounded-full overflow-hidden flex justify-center items-center border-dashed border-2 border-slate-400">
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
          <div className="text-center w-1/2 text-shadow font-light">
            <i>
              To update your avatar, click on the avatar and select a new
              picture. After changing your avatar or updating your information,
              you must click the <strong>Update</strong> button to save all
              changes.
            </i>
          </div>
          <div className="w-full shadow-lg p-1 rounded-lg flex justify-center gap-12 text-Dark">
            <div>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Light">FullName</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Light">Account name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your account name" {...field} />
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
                    <FormLabel className="text-Light">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-Light">Phone</FormLabel>
                    <FormControl className="">
                      <Input
                        type="text"
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
                  <FormItem className="">
                    <FormLabel className="text-Light">Date Of Birth</FormLabel>
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
          <div className="flex justify-center items-center text-center gap-1 text-shadow">
            <Calendar size={20} />
            {formatDate(data?.createdAt)}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
