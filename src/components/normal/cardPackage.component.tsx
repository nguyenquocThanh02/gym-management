import { CircleCheck, Flame } from "lucide-react";
import React from "react";
import ButtonCustom from "../custom/button.custom";
import { ScrollArea } from "../ui/scroll-area";
import { typePackage, typeResponsePackage } from "@/types";
import Link from "next/link";
import { calculatePrice, renderVND } from "@/utils";
import { typeDiscount } from "@/types/discount.type";
import { useRouter } from "next/navigation";

const CardPackage: React.FC<{ data: typeResponsePackage }> = ({ data }) => {
  const route = useRouter();
  const sumDiscount = (arrs): number => {
    let sum = 0;
    arrs?.map((item) => {
      sum += item?.percent;
    });
    return sum;
  };
  const handleRegister = () => {
    route.refresh();
    route.push(`/package/${data?.packages?._id}`);
  };
  return (
    <div>
      <div className="flex relative flex-col overflow-hidden rounded-2xl text-shadow bg-transparent transition-all duration-500 hover:bg-BgDark/60 p-6 border border-Light hover:shadow-xl hover:shadow-Light">
        <div className="absolute top-0 right-0 font-bold text-Primary bg-Light/70 rounded-es-full text-xl flex w-14 h-14 justify-center items-center">
          {data?.packages?.register}
        </div>
        <h3 className="font-manrope text-2xl font-bold mb-3 whitespace-nowrap text-ellipsis overflow-hidden w-60">
          {data?.packages?.name}
        </h3>
        <div className="flex items-end mb-6">
          <span className="font-manrope mr-2 text-4xl font-semibold">
            {renderVND(
              calculatePrice(data?.packages?.price, sumDiscount(data?.discount))
            )}
          </span>
          <s>{renderVND(data?.packages?.price)}</s>
        </div>
        <ScrollArea className="h-[300px] mb-3">
          <ul className="mb-12 space-y-6 text-left text-lg ">
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
              <span>{data?.packages?.duration} ngày thẻ hội viên</span>
            </li>
            <li className="flex items-center space-x-4">
              <CircleCheck className="text-Primary" />
              <span>Hỗ trợ khách hàng 24/7</span>
            </li>
            <li className="flex items-center space-x-4">
              <CircleCheck className="text-Primary" />
              <span>Truy cập tất cả tiện ích</span>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <h4>Đối tượng: </h4>
                <span>{data?.packages?.suitableFor}</span>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <h4>Mô tả: </h4>
                <span>{data?.packages?.description}</span>
              </div>
            </li>
          </ul>
        </ScrollArea>

        <ButtonCustom
          onClick={handleRegister}
          className="py-3 px-8 w-fit shadow-sm rounded-full text-lg mx-auto"
        >
          Đăng ký
        </ButtonCustom>
      </div>
    </div>
  );
};

export default CardPackage;
