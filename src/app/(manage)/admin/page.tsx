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
import { formatDate } from "@/utils";
const HomePage = () => {
  const [value, setValue] = useState("");
  const [theUser, setTheUser] = useState(null);
  const changeValue = (e: string) => {
    setValue(e);
  };

  const handleSearch = async () => {
    const user = await RegisterTrackingApis.getDetailsRegisterTracking(value);
    if (user?.status === 200) {
      setTheUser(user?.data);
    } else {
      toast.warning("Không có thẻ thành viên nào với tên bạn đã nhập!");
    }
    console.log(user?.data);
  };

  return (
    <div className="w-full mt-16">
      <h1 className="text-5xl font-medium text-black text-center">
        Kiểm tra thẻ thành viên
      </h1>
      <div className="w-full flex">
        <div className="relative flex w-1/2 mx-auto">
          <Input
            placeholder="Nhập tên thành viên"
            onChange={(e) => changeValue(e.target.value)}
            className="mx-auto mt-8 "
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
      </div>

      {theUser && (
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
                  <th className="border border-slate-300 px-2">Ngày bắt đầu</th>
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
      )}
    </div>
  );
};

export default HomePage;
