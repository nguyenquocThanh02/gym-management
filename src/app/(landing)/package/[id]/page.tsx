"use client";

import RegisterPackage from "@/components/form/registerPackage.form";
import ButtonCustom from "@/components/custom/button.custom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheck } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";

const ArticalPage = () => {
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
                Service daily
              </h3>
              <div className="flex items-center mb-6">
                <span className="font-manrope mr-2 text-6xl font-semibold">
                  $22
                </span>
                <span className="text-xl ">/ day</span>
              </div>
              <ul className="mb-12 space-y-6 text-left text-lg">
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>2 auto tracking</span>
                </li>
                <li className="flex items-center space-x-4">
                  <CircleCheck className="text-Primary" />
                  <span>7 Day transaction clearing </span>
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
                  <span>
                    This package is really suitable for anyone want to practive
                    in long time, so it can help you lose weight and make a
                    beauty body with perpect rate.
                  </span>
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
              Price: <strong>899000đ</strong>
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

export default ArticalPage;
