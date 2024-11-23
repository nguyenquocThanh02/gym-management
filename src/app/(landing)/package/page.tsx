"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import CardPackage from "@/components/normal/cardPackage.component";
import { PackageApis } from "@/services";
import { typeResponsePackage } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PackagePage = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["packages"],
    queryFn: () => PackageApis.getAllPackage(false),
  });
  const breadcrumbs = [
    {
      link: "/",
      name: "Trang chủ",
    },
    {
      link: "/package",
      name: "Gói tập",
    },
  ];

  const arrs: typeResponsePackage[] = data?.data || [];
  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full pb-10">
      <BreadcrumbCustom links={breadcrumbs} />

      <h1 className="text-center font-bold text-2xl md:text-4xl my-5">
        Gói tập
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arrs?.map((item, index) => (
          <div
            data-aos="fade-up"
            key={index}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <CardPackage data={item} key={Date.now()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagePage;
