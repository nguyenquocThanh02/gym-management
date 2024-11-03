"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RegisterTrackingApis, UserApis } from "@/services";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import card from "@/assets/img/card.png";
import { toast } from "sonner";
import { formatDate, renderVND } from "@/utils";
import Link from "next/link";
import ButtonCustom from "@/components/custom/button.custom";
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
import { useRouter } from "next/navigation";
const HomePage = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [theUser, setTheUser] = useState(null);
  const changeValue = (e: string) => {
    setValue(e);
  };

  const handleSearch = async () => {
    const results = await RegisterTrackingApis.getDetailsRegisterTrackingByName(
      value
    );
    if (results?.status === 200) {
      setTheUser(results?.data[results?.data.length - 1]);
    } else {
      toast.warning("Không có thẻ thành viên nào với tên bạn đã nhập!");
    }

    console.log(results?.data);
  };

  const handlePayment = async () => {
    const result = await RegisterTrackingApis.paymentRegisterTracking(
      theUser?._id
    );
    console.log(result);
    if (result?.status === "200") {
      toast.success("Xác nhận thanh toán thành công");
      setTheUser((prevUser) => ({ ...prevUser, isPaid: true }));
      setOpen(false);
    } else {
      toast.error("Chưa thanh toán được");
    }
  };
  return (
    <div className="w-full mt-16">
      <h1 className="text-5xl font-medium text-black text-center">
        Kiểm tra thẻ thành viên
      </h1>
      <div className="w-full flex gap-3 justify-center items-end">
        <div className="relative ">
          <Input
            placeholder="Nhập tên thành viên"
            onChange={(e) => changeValue(e.target.value)}
            className="mx-auto mt-8 w-[35vw]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          />
          <Button
            onClick={handleSearch}
            className="absolute top-[36px] right-1 h-8"
          >
            <Search />
          </Button>
        </div>
        <Link href={"/package"}>
          <ButtonCustom>Đăng ký gói tập</ButtonCustom>
        </Link>
      </div>

      {theUser && (
        <>
          <div className="w-full flex">
            <div className="mx-auto">
              <Image
                src={card}
                width={300}
                height={300}
                quality={100}
                alt="card"
                className="mx-auto"
              />
              <h2 className="text-xl font-medium text-center mb-4">
                {theUser?.user?.fullName}
              </h2>
              <table className="border-separate border-spacing-2 border border-slate-400">
                <thead>
                  <tr>
                    <th className="border border-slate-300 px-2">
                      Ngày bắt đầu
                    </th>
                    <th className="border border-slate-300 px-2">
                      Ngày kết thúc
                    </th>
                    <th className="border border-slate-300 px-2">
                      Trạng thái thanh toán
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-2">
                      {formatDate(theUser?.timeStart)}
                    </td>
                    <td className="border border-slate-300 px-2">
                      {formatDate(theUser?.timeEnd)}
                    </td>
                    <td className="border border-slate-300 px-2">
                      {theUser?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex w-full justify-center mt-8">
            {!theUser?.isPaid && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button className="">Thanh toán</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Xác nhận thanh toán</DialogTitle>
                    <DialogDescription>
                      Nhấn về xác nhận bên dưới để lưu thông tin thanh toán cho
                      khách hàng
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    Số tiền thanh toán:{" "}
                    <strong className="text-xl">
                      {renderVND(theUser?.totalPrice)}
                    </strong>
                  </div>
                  <DialogFooter>
                    <DialogClose>Quay lại</DialogClose>
                    <Button className="" onClick={handlePayment}>
                      Xác nhận
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
