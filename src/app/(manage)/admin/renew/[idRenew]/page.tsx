"use client";

import RegisterPackage from "@/components/form/registerPackage.form";
import ButtonCustom from "@/components/custom/button.custom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, CircleCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import {
  PackageApis,
  PTApis,
  RegisterTrackingApis,
  UserApis,
} from "@/services";
import WaitingLayout from "@/components/layout/waiting.layout";
import {
  typePackage,
  typeRegisterTracking,
  typeResponsePackage,
} from "@/types";
import { calculatePrice, renderVND } from "@/utils";
import { localStorageKey } from "@/constants/localStorage";
import mainStore from "@/store/main.store";
import { Button } from "@/components/ui/button";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import PaymentRegister from "@/app/(landing)/package/[idPackage]/payment.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateForm } from "@/hooks/useCreateForm.hook";
import { registerPackageRule } from "@/formSchema/formSchema";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import infoRTUser from "@/store/infoRTUser.store";

const handleTimeDate = (timeStart: any, duration: number | string) => {
  const timeEnd = new Date(
    new Date(timeStart).getTime() + Number(duration) * 24 * 60 * 60 * 1000
  );
  return timeEnd;
};
const RenewRTPage = ({ params }: { params: { idRenew: string } }) => {
  const [selectPk, setSelectPk] = useState(null);
  const [idPt, setIdPt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { infoUser, setInfoUser } = infoRTUser();
  console.log("🚀 ~ RenewRTPage ~ infoUser:", infoUser);
  const route = useRouter();

  const rts = useQuery({
    queryKey: ["rts"],
    queryFn: () =>
      RegisterTrackingApis.getDetailsRegisterTrackingByName(params.idRenew),
  });

  const dataRts = rts?.data?.data[0] || null;

  useEffect(() => {
    selectPackage(dataRts?.package?.idPackage);
    selectPt(dataRts?.package?.idPT || "");
  }, [dataRts]);

  const packages = useQuery({
    queryKey: ["packages"],
    queryFn: () => PackageApis.getAllPackageName(),
  });
  const dataPks = packages?.data?.data || [];

  const pts = useQuery({
    queryKey: ["pts"],
    queryFn: () => PTApis.getAllPT(false),
  });
  const dataPts = pts?.data?.data || [];

  const selectPackage = async (e) => {
    console.log("e:", e);
    const getPackage = await PackageApis.getDetailsPackage(e);
    if (getPackage?.status === "200") {
      console.log("🚀 ~ selectPackage ~ getPackage:", getPackage);
      setSelectPk(getPackage?.data);
    }
  };

  const selectPt = async (e) => {
    setIdPt(e);
  };

  async function onSubmit(values: z.infer<typeof registerPackageRule>) {
    setIsLoading(true);
    const dataRegisterTracking: typeRegisterTracking = {
      package: {
        price: selectPk?.packages?.price || dataRts?.package?.price,
        name: selectPk?.packages?.name || dataRts?.package?.name,
        idPackage: selectPk?.packages?._id || dataRts?.package?.idPackage,
      },
      idPT: idPt,
      user: {
        fullName: values.fullName,
        email: values.email,
        phone: String(values.phone),
        idUser: dataRts?.user?.idUser || undefined,
      },
      discount: {
        priceDescrease: undefined,
        idDiscount: [],
      },
      payment: {
        payerName: undefined,
        payerEmail: undefined,
        payerId: undefined,
        orderId: undefined,
      },
      paymentMethod: "offline",
      totalPrice: calculatePrice(selectPk?.packages?.price, 4),
      isPaid: true,
      paidAt: new Date(Date.now()),
      timeStart: values?.timeStart || new Date(Date.now()),
      timeEnd: new Date(
        handleTimeDate(
          values?.timeStart || new Date(Date.now()),
          selectPk?.packages?.duration
        )
      ),
    };

    const result = await RegisterTrackingApis.addRegisterTracking(
      dataRegisterTracking
    );

    if (result?.status === 201) {
      setInfoUser({});
      toast.success("Đăng ký thành công");
      route.push(
        `/admin/manage-register-tracking/details/${result?.data?._id}`
      );
    } else {
      toast.error(result?.message);
    }
    setIsLoading(false);
  }

  const form = useCreateForm(registerPackageRule, {
    fullName: infoUser?.fullName || dataRts?.user.fullName || "",
    email: infoUser?.email || dataRts?.user.email || "",
    phone: infoUser?.phone || dataRts?.user.phone || "",
    timeStart: new Date(Date.now()),
  });

  return (
    <div className="l-container pb-10">
      {isLoading && <WaitingLayout />}
      <h1 className="text-center font-bold text-2xl md:text-4xl my-6">
        Đăng ký gói tập
      </h1>
      <div className="flex flex-col md:flex-row gap-3 bg-slate-100 py-5">
        <div className="border flex-1 flex">
          <div className="w-1/2 p-3">
            <div>
              <h1 className="font-medium mb-3">Chọn gói tập</h1>
              <Select
                defaultValue={infoUser?.idPackage}
                onValueChange={(e) => selectPackage(e)}
                // disabled={justView}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dataPks &&
                    dataPks.map((val, i) => (
                      <SelectItem value={val?.id} key={i}>
                        {val?.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-5">
              <h1 className="font-medium mb-3">Chọn người hướng dẫn</h1>
              <Select
                defaultValue={infoUser?.idPT}
                onValueChange={(e) => selectPt(e)}
                disabled={selectPk?.packages?.sessionWithPT === "no"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dataPts &&
                    dataPts?.map((val, i) => (
                      <SelectItem value={val?._id} key={i}>
                        {val?.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-1/2 border p-3">
            <h1 className="font-medium mb-3 mt-1">Thông tin người tập:</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-5"
              >
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            className=""
                            placeholder="Họ và tên"
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
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input
                            className=""
                            placeholder="Số điện thoại"
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
                          <Input className="" placeholder="email" {...field} />
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
                        <FormLabel>Ngày bắt đầu</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal  hover: hover:text-white",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Chọn ngày</span>
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
              </form>
            </Form>
          </div>
        </div>
        <div className="border h-fit md:w-[26%] p-3">
          <div className="flex flex-col gap-3">
            <div>
              Giá: <strong>{renderVND(selectPk?.packages?.price)}</strong>
            </div>

            <div className="flex gap-3">
              Giảm: (4 🏅)
              <strong>
                -{renderVND(calculatePrice(selectPk?.packages?.price, 100 - 4))}
              </strong>
            </div>
            <hr />
            <div>
              Tổng cộng:{" "}
              <strong className="text-bold text-Primary text-2xl">
                {renderVND(calculatePrice(selectPk?.packages?.price, 4))}
              </strong>
            </div>
            <ButtonCustom
              variant="custom"
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              Xác nhận
            </ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewRTPage;
