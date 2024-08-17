import { CircleCheck } from "lucide-react";
import React from "react";
import ButtonCustom from "./buttonCustom";
import { ScrollArea } from "./scroll-area";

const CardPackage = () => {
  return (
    <div>
      <div className="flex flex-col rounded-2xl bg-transparent transition-all duration-500 hover:bg-Background/60 p-6 border border-white hover:shadow-xl hover:shadow-white">
        <h3 className="font-manrope text-2xl font-bold mb-3">Service daily</h3>
        <div className="flex items-center mb-6">
          <span className="font-manrope mr-2 text-6xl font-semibold">$22</span>
          <span className="text-xl ">/ day</span>
        </div>
        <ScrollArea className="h-[300px] mb-3">
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
                This package is really suitable for anyone want to practive in
                long time, so it can help you lose weight and make a beauty body
                with perpect rate.
              </span>
            </li>
          </ul>
        </ScrollArea>

        <ButtonCustom className="py-3 px-6 w-fit shadow-sm rounded-full mx-auto text-lg">
          Register service
        </ButtonCustom>
      </div>
    </div>
  );
};

export default CardPackage;
