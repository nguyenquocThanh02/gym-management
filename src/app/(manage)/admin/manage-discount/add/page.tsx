"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import React from "react";
import { useRouter } from "next/navigation";
import DetailsDeviceForm from "@/components/form/detailDevice.form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DetailsPackageForm from "@/components/form/detailPackage.form";
import DetailsDiscountForm from "@/components/form/detailDiscount.form";
import { useQuery } from "@tanstack/react-query";
import { PackageApis } from "@/services";
import { typePackageName } from "@/types";

const AddDiscount = () => {
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
      name: "Add discount",
    },
  ];

  const handleBack = () => {
    route.back();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["packageNames"],
    queryFn: () => PackageApis.getAllPackageName(),
  });
  const packages: typePackageName[] = data?.data || [];
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
          <DetailsDiscountForm data={null} id="" packages={packages} />
        </CardContent>
      </Card>
    </section>
  );
};

export default AddDiscount;
