"use client";
import React from "react";
import CardPackage from "./cardPackage.component";
import { ArticalApis } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { typeArtical } from "@/types";
import CardArtical from "./cardArtical.component";

const NewArticals = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["newArticals"],
    queryFn: ArticalApis.getNewArticals,
  });

  const arrs: typeArtical[] = data?.data || [];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
      {arrs?.map((item, index) => (
        <div
          data-aos="fade-up"
          key={index}
          className="md:basis-1/2 lg:basis-1/3"
        >
          <CardArtical theArtical={item} />
        </div>
      ))}
    </div>
  );
};

export default NewArticals;
