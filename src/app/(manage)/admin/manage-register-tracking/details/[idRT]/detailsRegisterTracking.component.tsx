"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterTrackingApis } from "@/services";
import { typeRegisterTracking } from "@/types";
import { formatDate, renderVND } from "@/utils";
import Link from "next/link";
import React, { use, useState } from "react";
import { toast } from "sonner";

const DetailsRegisterTrackingComponent: React.FC<{
  data: typeRegisterTracking;
}> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handlePayment = async () => {
    const paymentResult = await RegisterTrackingApis.paymentRegisterTracking(
      data?._id || ""
    );
    if (paymentResult?.status === "200") {
      toast.success("Thanh toán thành công");
      location.reload();
    } else {
      setOpen(false);
      toast.error("Err: ", paymentResult?.message);
    }
  };
  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex gap-3">
          {!data?.isPaid && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                  Thanh toán
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Dịch vụ thanh toán</DialogTitle>
                  <DialogDescription>
                    Bằng cách xác nhận dịch vụ thanh toán, bạn sẽ hoàn tất thanh
                    toán cho việc đăng ký này. Nhấn <strong>xác nhận</strong> để
                    hoàn tất.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Đóng
                    </Button>
                  </DialogClose>
                  <Button onClick={handlePayment}>Xác nhận</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                  Invite account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Status</DialogTitle>
                  <DialogDescription>
                    <Form {...form}>
                      <form className="space-y-8">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="abc@gmail.com"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Invite
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
        </div>
      </div>
      <hr />
      <div className="flex justify-around gap-8 mt-4">
        <div>
          <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
            Gói tập
          </h3>
          <ul className="shadow-sm p-2">
            <li className="flex gap-3 my-5 items-center">
              Tên:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.package?.name}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Giá:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {renderVND(data?.package?.price)}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Thời gian bắt đầu:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {formatDate(data?.timeStart)}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Thời gian kết thúc:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {formatDate(data?.timeEnd)}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              ID gói tập:{" "}
              <Link
                href={`/admin/manage-package/details/${data?.package?.idPackage}`}
                className="border p-1 bg-slate-50 text-blue-500 rounded-md"
              >
                {data?.package?.idPackage}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
            Người dùng
          </h3>
          <ul className="shadow-sm p-2">
            <li className="flex gap-3 my-5 items-center">
              Họ và tên:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.user?.fullName}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Email:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.user?.email}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Số điện thoại:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.user?.phone}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              ID người dùng:{" "}
              <Link
                href={`/admin/manage-account/details/${data?.user?.idUser}`}
                className="border p-1 bg-slate-50 text-blue-500 rounded-md"
              >
                {data?.user?.idUser}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
            Tổng quan
          </h3>
          <ul className="shadow-sm p-2">
            <li className="flex gap-3 my-5 items-center">
              Khuyến mãi:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.discount?.priceDescrease
                  ? renderVND(data?.discount?.priceDescrease)
                  : "0"}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Tổng tiền:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {renderVND(data?.totalPrice)}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Phương thức thanh toán:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.paymentMethod === "offline" ? "Trực tiếp" : "Paypal"}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Đã thanh toán?:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.isPaid ? "Xong" : "Chưa"}
              </p>
            </li>
          </ul>
        </div>
        {data?.isPaid && (
          <div>
            <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
              Thanh toán
            </h3>
            <ul className="shadow-sm p-2">
              <li className="flex gap-3 my-5 items-center">
                Mã thanh toán:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.orderId || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Mã người dùng:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.payerId || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Tên tài khoản:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.payerName || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Email thanh toán:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.payerEmail || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Thời gian thanh toán:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {formatDate(data?.paidAt)}
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsRegisterTrackingComponent;
