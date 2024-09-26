"use client";
import CardPackage from "@/components/normal/cardPackage.component";
import { PackageApis } from "@/services";
import { typePackage, typeResponsePackage } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PackagePage = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["packages"],
    queryFn: PackageApis.getAllPackage,
  });

  const arrs: typeResponsePackage[] = data?.data || [];
  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full pb-10">
      <h1 className="text-center font-bold text-2xl md:text-4xl my-5">
        Packages
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};

export default PackagePage;
