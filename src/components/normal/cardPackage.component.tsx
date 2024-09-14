import { CircleCheck, Flame } from "lucide-react";
import React from "react";
import ButtonCustom from "../custom/button.custom";
import { ScrollArea } from "../ui/scroll-area";
import { typePackage } from "@/types";
import Link from "next/link";

const CardPackage: React.FC<{ data: typePackage }> = ({ data }) => {
  return (
    <div>
      <div className="flex relative flex-col overflow-hidden rounded-2xl text-shadow bg-transparent transition-all duration-500 hover:bg-BgDark/60 p-6 border border-Light hover:shadow-xl hover:shadow-Light">
        <div className="absolute top-0 right-0 font-bold text-Primary bg-Light/70 rounded-es-full text-xl flex w-14 h-14 justify-center items-center">
          {data?.register}
        </div>
        <h3 className="font-manrope text-2xl font-bold mb-3">{data?.name}</h3>
        <div className="flex items-center mb-6">
          <span className="font-manrope mr-2 text-6xl font-semibold">
            ${data?.price}
          </span>
        </div>
        <ScrollArea className="h-[300px] mb-3">
          <ul className="mb-12 space-y-6 text-left text-lg ">
            <li className="flex items-center space-x-4">
              <CircleCheck className="text-Primary" />
              <span>{data?.sessionWithPT} sessions with PT</span>
            </li>
            <li className="flex items-center space-x-4">
              <CircleCheck className="text-Primary" />
              <span>{data?.duration} days membership </span>
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
                <span>{data?.suitableFor}</span>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <h4>Description: </h4>
                <span>{data?.description}</span>
              </div>
            </li>
          </ul>
        </ScrollArea>

        <Link href={`/package/${data?._id}`} className="mx-auto">
          <ButtonCustom className="py-3 px-8 w-fit shadow-sm rounded-full text-lg">
            Register
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default CardPackage;
