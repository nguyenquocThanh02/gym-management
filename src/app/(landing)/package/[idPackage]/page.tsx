"use client";

import RegisterPackage from "@/components/form/registerPackage.form";
import ButtonCustom from "@/components/custom/button.custom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { PackageApis, UserApis } from "@/services";
import WaitingLayout from "@/components/layout/waiting.layout";
import { typePackage, typeResponsePackage } from "@/types";
import { calculatePrice, renderVND } from "@/utils";
import { localStorageKey } from "@/constants/localStorage";
import mainStore from "@/store/main.store";
import { Button } from "@/components/ui/button";
import PaymentRegister from "./payment.component";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";

const PackageDetail = ({ params }: { params: { idPackage: string } }) => {
  const { setInforUser, setInforPackage } = mainStore();

  console.log(params.idPackage);
  const {
    data,
    isLoading,
    isSuccess: isSuccessGetPackage,
    refetch,
  } = useQuery({
    queryKey: ["package"],
    queryFn: () => PackageApis.getDetailsPackage(params.idPackage),
  });

  const idUser = localStorage.getItem(localStorageKey?.userId) || "";

  const {
    data: infor,
    isLoading: isLoadingInfor,
    isSuccess: isSuccessGetInforUser,
  } = useQuery({
    queryKey: ["inforUser"],
    queryFn: () => UserApis.getDetailsUser(idUser),
  });

  useEffect(() => {
    setInforUser(infor?.data);
    setInforPackage(data?.data);
  }, [isSuccessGetInforUser, isSuccessGetPackage]);

  const sumDiscount = (arrs): number => {
    let sum = 0;
    arrs?.map((item) => {
      sum += item?.percent;
    });

    return sum;
  };

  const breadcrumbs = [
    {
      link: "/",
      name: "Trang chủ",
    },
    {
      link: "#",
      name: "Chi tiết gói tập",
    },
  ];

  if (isLoading || isLoadingInfor) {
    return <WaitingLayout />;
  }

  return (
    <div className="l-container pb-10">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center font-bold text-2xl md:text-4xl my-6">
        Đăng ký gói tập
      </h1>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="border h-[480px] flex-1 flex">
          <div className="w-1/2 p-3">
            <h3 className="mb-1">Gói tập</h3>
            <hr />
            <ScrollArea className="h-[90%] mb-3">
              <h3 className="font-manrope text-2xl font-bold mb-3">
                {data?.data?.packages?.name}
              </h3>
              <div className="flex items-end mb-6">
                <span className="font-manrope mr-2 text-6xl font-semibold">
                  {renderVND(
                    calculatePrice(
                      data?.data?.packages?.price,
                      sumDiscount(data?.data?.discount)
                    )
                  )}
                </span>
                <s>{renderVND(data?.data?.packages?.price)}</s>
              </div>
              <ul className="mb-12 space-y-6 text-left text-lg">
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>
                    {data?.packages?.sessionWithPT === "no"
                      ? "Không có huấn luyện viên"
                      : data?.packages?.sessionWithPT === "full"
                      ? "Có huấn luyện viên cá nhân"
                      : "Có hướng dẫn (hỗ trợ)"}
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>
                    {data?.data?.packages?.duration} ngày thẻ thành viên
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>Hỗ trợ khách hàng 24/7</span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>Tham gia tất cả dịch vụ</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div>
                    <h4>Đối tượng: </h4>
                    <span>{data?.data?.packages?.suitableFor}</span>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div>
                    <h4>Mô tả: </h4>
                    <span>{data?.data?.packages?.description}</span>
                  </div>
                </li>
              </ul>
            </ScrollArea>
          </div>
          <div className="w-1/2 border p-3">
            <h3 className="mb-1">Thông tin</h3>
            <hr className="mb-2" />
            <RegisterPackage key={Date.now()} />
          </div>
        </div>
        <div className="border h-fit md:w-[26%] p-3">
          <div className="flex flex-col gap-3">
            <div>
              Giá: <strong>{renderVND(data?.data?.packages?.price)}</strong>
            </div>
            <div>
              Khuyến mãi:{" "}
              <strong>
                -
                {renderVND(
                  calculatePrice(
                    data?.data?.packages?.price,
                    100 - sumDiscount(data?.data?.discount)
                  )
                )}
              </strong>
            </div>
            <div className="flex gap-3">
              Thưởng: ({infor?.data?.core}🏅)
              <strong>
                -
                {renderVND(
                  calculatePrice(
                    data?.data?.packages?.price,
                    100 - (infor?.data?.core | 0)
                  )
                )}
              </strong>
            </div>
            <hr />
            <div>
              Tổng cộng:{" "}
              <strong className="text-bold text-Primary text-2xl">
                {renderVND(
                  calculatePrice(
                    data?.data?.packages?.price,
                    sumDiscount(data?.data?.discount) + (infor?.data?.core | 0)
                  )
                )}
              </strong>
            </div>
          </div>
          <PaymentRegister
            key={Date.now()}
            inforPackage={data?.data}
            inforUser={infor?.data}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
