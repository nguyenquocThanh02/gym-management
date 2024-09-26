"use client";
import React from "react";
import CardPackage from "./cardPackage.component";
import { PackageApis } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { typePackage, typeResponsePackage } from "@/types";

const PopularPackages = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["popularPackages"],
    queryFn: PackageApis.getPopularPackage,
  });

  const arrs: typeResponsePackage[] = data?.data || [];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-5 py-10">
      {arrs?.map((item, index) => (
        <div
          data-aos="fade-up"
          key={index}
          className="md:basis-1/2 lg:basis-1/3"
        >
          <CardPackage data={item} />
        </div>
      ))}
    </div>
  );
};

export default PopularPackages;
