"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterTrackingApis } from "@/services";
import { formatDate } from "@/utils";
import React from "react";
import { toast } from "sonner";

const CalendarToday: React.FC<{ data: any; pt: any; justView?: boolean }> = ({
  data,
  pt,
  justView = false,
}) => {
  console.log("pt:", pt);
  const handleAddPTtoRT = async (idRT: string, idPT: string) => {
    const result = await RegisterTrackingApis.addPTtoRT(idRT, idPT);
    toast.info("Đã thêm huấn luyện viên thành công");
    console.log(result);
  };
  return (
    <div>
      <h1 className="text-2xl font-medium">
        Thông tin gói tập - huấn luyện viên
      </h1>
      <div className="mt-5">
        <div className="flex shadow w-full h-8 items-center">
          <div className="flex-1">STT</div>
          <div className="flex-1">Số buổi hướng dẫn</div>
          <div className="flex-1">Loại gói</div>
          <div className="flex-1">Ngày bắt đầu</div>
          <div className="flex-1">Người dùng</div>
          <div className="flex-1">Chọn PT</div>
        </div>
        {data?.map((item, index) => (
          <div className="shadow w-full h-12 flex items-center" key={index}>
            <div className="flex-1">{index + 1}</div>
            <div className="flex-1">
              {item?.package?.idPackage?.sessionWithPT}
            </div>
            <div className="flex-1">{item?.package?.idPackage?.type}</div>
            <div className="flex-1">{formatDate(item?.timeStart)}</div>
            <div className="flex-1">
              <Drawer>
                <DrawerTrigger className="hover:text-Primary">
                  {item?.user?.fullName}
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-center">
                      Thông tin khách hàng đăng ký
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="w-full  my-5">
                    <div className="text-center">
                      Họ tên: {item?.user?.fullName}
                    </div>
                    <div className="text-center">
                      Email: {item?.user?.email}
                    </div>
                    <div className="text-center">
                      Số điện thoại: {item?.user?.phone}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="flex-1">
              <Select
                defaultValue={item?.idPT}
                onValueChange={(e) => handleAddPTtoRT(item?._id, e)}
                disabled={justView}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pt?.map((val, i) => (
                    <SelectItem value={val?._id} key={i}>
                      {val?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarToday;
