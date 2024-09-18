"use client";

import RegisterPackage from "@/components/form/registerPackage.form";
import ButtonCustom from "@/components/custom/button.custom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheck } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { PackageApis } from "@/services";
import WaitingLayout from "@/components/layout/waiting.layout";
import { typePackage, typeResponsePackage } from "@/types";
import { calculatePrice } from "@/utils";

const PackageDetail = ({ params }: { params: { idPackage: string } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["package"],
    queryFn: () => PackageApis.getDetailsPackage(params.idPackage),
  });
  const thePackage: typeResponsePackage = data?.data || null;
  if (isLoading) {
    return <WaitingLayout />;
  }

  const sumDiscount = (arrs): number => {
    let sum = 0;
    arrs?.map((item) => {
      sum += item?.percent;
    });
    return sum;
  };

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
                {thePackage?.packages?.name}
              </h3>
              <div className="flex items-end mb-6">
                <span className="font-manrope mr-2 text-6xl font-semibold">
                  $
                  {calculatePrice(
                    thePackage?.packages?.price,
                    sumDiscount(thePackage?.discount)
                  )}
                </span>
                <s>${thePackage?.packages?.price}</s>
              </div>
              <ul className="mb-12 space-y-6 text-left text-lg">
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>
                    {thePackage?.packages?.sessionWithPT} sessions with PT
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>{thePackage?.packages?.duration} days membership</span>
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
                    <span>{thePackage?.packages?.suitableFor}</span>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div>
                    <h4>Description: </h4>
                    <span>{thePackage?.packages?.description}</span>
                  </div>
                </li>
              </ul>
            </ScrollArea>
          </div>
          <div className="w-1/2 border p-3">
            <h3 className="mb-1">Information</h3>
            <hr className="mb-2" />
            <RegisterPackage />
          </div>
        </div>
        <div className="border h-fit md:w-[26%] p-3">
          <div className="flex flex-col gap-3">
            <div>
              Price:{" "}
              <strong>
                {calculatePrice(
                  thePackage?.packages?.price,
                  sumDiscount(thePackage?.discount)
                )}
                $
              </strong>
            </div>
            <div>
              Discound: <strong>100000đ</strong>
            </div>
            <hr />
            <div>
              Total:{" "}
              <strong className="text-bold text-Primary text-2xl">
                799000đ
              </strong>
            </div>
          </div>
          <div className="mt-3 flex gap-3">
            Payment with paypal
            <Switch className="" />
          </div>
          <ButtonCustom className="w-full mt-4">Register</ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
