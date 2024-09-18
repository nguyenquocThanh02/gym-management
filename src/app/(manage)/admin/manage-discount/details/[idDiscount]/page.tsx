"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import DetailsDiscountForm from "@/components/form/detailDiscount.form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DiscountApis, PackageApis } from "@/services";
import { typePackageName } from "@/types";
import { typeDiscount } from "@/types/discount.type";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const DetailsDiscount = ({ params }: { params: { idDiscount: string } }) => {
  const route = useRouter();

  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-discount",
      name: "Discount management",
    },
    {
      link: "#",
      name: "Details discount",
    },
  ];

  const handleBack = () => {
    route.back();
  };

  const { data } = useQuery({
    queryKey: ["discount"],
    queryFn: () => DiscountApis.getDetailsDiscount(params?.idDiscount),
  });
  const discount: typeDiscount = data?.data || null;

  const { data: dataPackage } = useQuery({
    queryKey: ["packageNames"],
    queryFn: () => PackageApis.getAllPackageName(),
  });
  const packages: typePackageName[] = dataPackage?.data || [];

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={handleBack}>Back</ButtonCustom>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Discounts</CardTitle>
          <CardDescription>Manage your discounts.</CardDescription>
        </CardHeader>
        <CardContent>
          <DetailsDiscountForm
            data={discount}
            id={params.idDiscount}
            packages={packages}
            key={Date.now()}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default DetailsDiscount;
