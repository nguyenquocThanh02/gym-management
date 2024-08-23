"use client";
import React, { use, useState } from "react";
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
import { ptRule, registerRule } from "@/formSchema/formSchema";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import { PhoneInput } from "../custom/phoneInput.custom";
import { typePT } from "@/types/pt.type";
import { Divide, Plus } from "lucide-react";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebases/firebase";
import ButtonCustom from "../custom/button.custom";
import { ScrollArea } from "../ui/scroll-area";
import { PTApis } from "@/services/pt.service";
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

const DetailsPtForm: React.FC<{ data: typePT | null; id: string | null }> = ({
  data,
  id = "",
}) => {
  const [status, setStatus] = React.useState<string>(data?.status || "");
  const [urlImage, setUrlImage] = React.useState<string>(
    data?.profileImage || ""
  );
  const [file, setFile] = React.useState("");

  const [isLoading1, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleSelectImage = (value) => {
    setFile(value.target.files[0]);
    setUrlImage(URL.createObjectURL(value.target.files[0]));
  };

  const form = useCreateForm(ptRule, {
    name: data?.name || "",
    email: data?.contactInfor?.email || "",
    phone: data?.contactInfor?.phone || "",
    specialty: data?.specialty || "",
    experienceYears: data?.experienceYears || "",
    address: data?.address || "",
    bio: data?.bio || "",
    profileImage: "",
  });

  async function onSubmit(values: z.infer<typeof ptRule>) {
    setIsLoading(true);
    let linkImg: string = "";
    if (file) {
      const storageRef = ref(storage, "images/" + file?.name);
      await uploadBytes(storageRef, file);
      linkImg = await getDownloadURL(storageRef);
    }
    const dataAddPT: typePT = {
      name: values?.name,
      specialty: values?.specialty,
      experienceYears: Number(values?.experienceYears),
      address: values?.address,
      bio: values?.bio,
      profileImage: linkImg || urlImage || "",
      contactInfor: {
        phone: values?.phone,
        email: values?.email || "",
      },
    };

    console.log(dataAddPT);

    if (!id) {
      try {
        const result = await PTApis.addPT(dataAddPT);
        console.log("test: ", result);
        console.log("test>>>: ", result?.status);
        if (result?.status === "201") {
          console.log("thanh cong");
          toast.success("Add new PT successfully");
          form.reset();
        } else {
          toast.error(result?.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }
    } else {
      try {
        const result = await PTApis.updatePT(dataAddPT, id);
        if (result?.status === "200") {
          toast.success("Update PT successfully");
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
      const idPt = id || "";
      const statusChange = status === "active" ? "block" : "active";
      const result = await PTApis.changeStatusPT(idPt, statusChange);
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
      <h4 className="text-center text-2xl font-semibold text-shadow">
        {id ? "Update PT" : "Add PT"}
      </h4>
      <div className="flex justify-between mb-2 items-center">
        <div>
          {id ? (
            <h3>
              Status:{" "}
              <Badge
                className={`${
                  status === "active" ? "bg-green-800" : "bg-Primary"
                }`}
              >
                {status}
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
                  <DialogTitle className="text-black">Edit profile</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to{" "}
                    {status === "active" ? "block" : "unblock"} the PT
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
        <form className="lg:flex lg:flex-wrap w-full lg:gap-5">
          <div className="w-1/3 shadow-lg p-5 border rounded-lg flex flex-col items-center">
            <div className="relative w-5/6 mx-auto h-5/6 mb-5  rounded-lg overflow-hidden flex justify-center items-center border-dashed border-2 border-slate-400">
              {urlImage && <Image src={urlImage} alt="image-profile" fill />}
              <Plus size={60} color="#ccc" />
            </div>
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-center"
                      type="file"
                      multiple
                      {...field}
                      onChange={handleSelectImage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 shadow-lg p-1 border rounded-lg">
            <ScrollArea className="h-[70vh] w-full">
              <div className="p-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Nguyen Van A" {...field} />
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
                        <Input placeholder="abc@gmail.com" {...field} />
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
                      <FormLabel>Phone *</FormLabel>
                      <FormControl className="">
                        <PhoneInput
                          className=""
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
                  name="experienceYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Years</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty *</FormLabel>
                      <FormControl>
                        <Input placeholder="Fitness or Yoga ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Experience training for artist ..."
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
        </form>
      </Form>
    </>
  );
};

export default DetailsPtForm;
