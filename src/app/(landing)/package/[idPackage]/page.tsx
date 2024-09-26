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
import { calculatePrice } from "@/utils";
import { localStorageKey } from "@/constants/localStorage";
import mainStore from "@/store/main.store";
import { Button } from "@/components/ui/button";
import PaymentRegister from "./payment.component";

const PackageDetail = ({ params }: { params: { idPackage: string } }) => {
  const idUser = localStorage.getItem(localStorageKey?.userId) || "";
  const { setInforUser, setInforPackage, inforPackage } = mainStore();

  const {
    data,
    isLoading,
    isSuccess: isSuccessGetPackage,
  } = useQuery({
    queryKey: ["package"],
    queryFn: () => PackageApis.getDetailsPackage(params.idPackage),
  });

  const {
    data: infor,
    isLoading: isLoadingInfor,
    isSuccess: isSuccessGetInforUser,
  } = useQuery({
    queryKey: ["inforUser"],
    queryFn: () => UserApis.getDetailsUser(idUser),
  });

  useEffect(() => {
    if (isSuccessGetInforUser) {
      setInforUser(infor?.data);
    }
    if (isSuccessGetPackage) {
      setInforPackage(data?.data);
    }
  }, [isSuccessGetInforUser, isSuccessGetPackage]);

  const sumDiscount = (arrs): number => {
    let sum = 0;
    arrs?.map((item) => {
      sum += item?.percent;
    });
    return sum;
  };

  if (isLoading || isLoadingInfor) {
    return <WaitingLayout />;
  }

  return (
    <div className="l-container pb-10">
      <h1 className="text-center font-bold text-2xl md:text-4xl my-6">
        Book Package
      </h1>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="border h-[480px] flex-1 flex">
          <div className="w-1/2 p-3">
            <h3 className="mb-1">Package</h3>
            <hr />
            <ScrollArea className="h-[90%] mb-3">
              <h3 className="font-manrope text-2xl font-bold mb-3">
                {inforPackage?.packages?.name}
              </h3>
              <div className="flex items-end mb-6">
                <span className="font-manrope mr-2 text-6xl font-semibold">
                  $
                  {calculatePrice(
                    inforPackage?.packages?.price,
                    sumDiscount(inforPackage?.discount)
                  )}
                </span>
                <s>${inforPackage?.packages?.price}</s>
              </div>
              <ul className="mb-12 space-y-6 text-left text-lg">
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>
                    {inforPackage?.packages?.sessionWithPT} sessions with PT
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>
                    {inforPackage?.packages?.duration} days membership
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>24/7 Customer support </span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>All widget access</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div>
                    <h4>Object: </h4>
                    <span>{inforPackage?.packages?.suitableFor}</span>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div>
                    <h4>Description: </h4>
                    <span>{inforPackage?.packages?.description}</span>
                  </div>
                </li>
              </ul>
            </ScrollArea>
          </div>
          <div className="w-1/2 border p-3">
            <h3 className="mb-1">Information</h3>
            <hr className="mb-2" />
            <RegisterPackage key={Date.now()} />
          </div>
        </div>
        <div className="border h-fit md:w-[26%] p-3">
          <div className="flex flex-col gap-3">
            <div>
              Price: <strong>{inforPackage?.packages?.price} $</strong>
            </div>
            <div>
              Discound:{" "}
              <strong>
                {calculatePrice(
                  inforPackage?.packages?.price,
                  100 - sumDiscount(inforPackage?.discount)
                )}
                $
              </strong>
            </div>
            <hr />
            <div>
              Total:{" "}
              <strong className="text-bold text-Primary text-2xl">
                {calculatePrice(
                  inforPackage?.packages?.price,
                  sumDiscount(inforPackage?.discount)
                )}
                $
              </strong>
            </div>
          </div>
          <PaymentRegister />
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
