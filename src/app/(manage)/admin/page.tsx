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
import { cn } from "@/lib/utils";
import infoRTUser from "@/store/infoRTUser.store";

function isExpiredTime(dateString) {
  const parts = dateString.split("/");
  const inputDate = new Date(parts[2], parts[1] - 1, parts[0]);
  inputDate.setHours(0, 0, 0, 0);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return inputDate < currentDate;
}

const totalPrice = (price: any, discount: number) => {
  return Number((price * (100 - discount)) / 100);
};

const HomePage = () => {
  const route = useRouter();

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [theUser, setTheUser] = useState(null);
  const [historyRT, setHistoryRT] = useState([]);
  const { infoUser, setInfoUser } = infoRTUser();
  const changeValue = (e: string) => {
    setValue(e);
  };

  const handleSearch = async () => {
    const results = await RegisterTrackingApis.getDetailsRegisterTrackingByName(
      value
    );
    if (results?.status === 200) {
      setTheUser(results?.data[results?.data.length - 1]);
      setHistoryRT(results?.data.slice(1));
    } else {
      toast.warning("Không có thẻ thành viên nào với tên bạn đã nhập!");
    }

    console.log(results?.data);
  };

  const handlePayment = async () => {
    const result = await RegisterTrackingApis.paymentRegisterTracking(
      theUser?._id
    );
    if (result?.status === "200") {
      toast.success("Xác nhận thanh toán thành công");
      setTheUser((prevUser) => ({ ...prevUser, isPaid: true }));
      setOpen(false);
    } else {
      toast.error("Chưa thanh toán được");
    }
  };

  const handleRenew = (data) => {
    console.log("***", data);
    setInfoUser({
      fullName: data?.user?.fullName,
      email: data?.user?.email,
      phone: data?.user?.phone,
      idPackage: data?.package?.idPackage,
      idPT: data?.idPT,
    });
    route.push(`/admin/renew/${data?._id}`);
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
        <Link href={"/admin/registerPackage"}>
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
                Người tập: {theUser?.user?.fullName}
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
                      Chi tiết người hướng dẫn
                    </th>
                    <th className="border border-slate-300 px-2">
                      Trạng thái thanh toán
                    </th>
                    <th className="border border-slate-300 px-2">
                      Chi tiết đăng ký
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-2">
                      {formatDate(theUser?.timeStart)}
                    </td>
                    <td
                      className={cn(
                        "border border-slate-300 px-2 text-green-700",
                        {
                          "text-red-700": isExpiredTime(
                            formatDate(theUser?.timeEnd)
                          ),
                        }
                      )}
                    >
                      {formatDate(theUser?.timeEnd)}
                    </td>
                    <td className="border border-slate-300 px-2 hover:opacity-60">
                      <Link
                        href={`/admin/manage-personal-trainer/details/${theUser?.idPT}`}
                      >
                        {theUser?.idPT ? theUser?.idPT : "Không có"}
                      </Link>
                    </td>
                    <td className="border border-slate-300 px-2">
                      {theUser?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </td>
                    <td className="border border-slate-300 px-2 hover:opacity-60">
                      <Link
                        href={`/admin/manage-register-tracking/details/${theUser?._id}`}
                      >
                        {theUser?._id ? theUser?._id : "Không có"}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              {isExpiredTime(formatDate(theUser?.timeEnd)) && (
                <div className="flex justify-center items-center">
                  <Button className="mt-4" onClick={() => handleRenew(theUser)}>
                    Đăng ký lại
                  </Button>
                </div>
              )}
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
                      Nhấn vào xác nhận bên dưới để lưu thông tin thanh toán cho
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
      {historyRT && historyRT.length > 1 && (
        <div className="mt-8">
          <h1 className="text-center font-semibold text-2xl">
            Lịch sử đăng ký
          </h1>
          {historyRT.map((item, index) => (
            <div key={index} className="mt-5">
              <div className="w-full flex">
                <div className="mx-auto">
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
                          Chi tiết người hướng dẫn
                        </th>
                        <th className="border border-slate-300 px-2">
                          Chi tiết đáng ký
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 px-2">
                          {formatDate(item?.timeStart)}
                        </td>
                        <td className={cn("border border-slate-300 px-2")}>
                          {formatDate(item?.timeEnd)}
                        </td>
                        <td className="border border-slate-300 px-2 hover:opacity-60">
                          <Link
                            href={`/admin/manage-personal-trainer/details/${item?.idPT}`}
                          >
                            {item?.idPT ? item?.idPT : "Không có"}
                          </Link>
                        </td>
                        <td className="border border-slate-300 px-2 hover:opacity-60">
                          <Link
                            href={`/admin/manage-register-tracking/details/${item?._id}`}
                          >
                            {item?._id ? item?._id : "Không có"}
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
