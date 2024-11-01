"use client";
import { DiscountApis } from "@/services";
import { typeDiscount } from "@/types/discount.type";
import { formatDate } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { FlagTriangleLeft } from "lucide-react";
import React from "react";

const ActiveDiscount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["active-discounts"],
    queryFn: () => DiscountApis.getActiveDiscount(),
  });
  const activeDiscount: typeDiscount[] = data?.data || [];

  return (
    <>
      <div className="hidden lg:flex lg:gap-2 absolute top-[270px] left-8 w-fit h-fit p-2">
        {activeDiscount.length > 0 &&
          activeDiscount?.map((item, index) => (
            <ul
              data-aos="fade-right"
              key={index}
              className="text-left leading-relaxed space-y-1 rounded blur-shadow w-[200px] p-3"
            >
              <h3 className="font-medium">{item?.name} 🔥</h3>
              <li>Từ {formatDate(item?.validFrom)}</li>
              <li>Đến {formatDate(item?.validTo)}</li>
              <li>- {item?.percent}% giảm</li>
              <li>{item?.description}</li>
            </ul>
          ))}
      </div>
    </>
  );
};

export default ActiveDiscount;
