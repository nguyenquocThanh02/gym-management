"use client";
import DetailsPtForm from "@/components/form/detailPt.form";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import React from "react";
import { useRouter } from "next/navigation";
import DetailsPackageForm from "@/components/form/detailPackage.form";
import { PackageApis } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function DetailPackage({
  params,
}: {
  params: { idPackage: string };
}) {
  const route = useRouter();
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-package",
      name: "Package management",
    },
    {
      link: "#",
      name: "Add Package",
    },
  ];

  const handleBack = () => {
    route.back();
  };

  const { data, isLoading } = useQuery<any>({
    queryKey: ["package"],
    queryFn: () => PackageApis.getDetailsPackage(params.idPackage),
  });

  if (isLoading) {
    return <div>Skelonton</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={handleBack}>Back</ButtonCustom>
      </div>
      <DetailsPackageForm
        key={Date.now()}
        data={data?.data?.packages}
        id={params.idPackage}
      />
    </section>
  );
}
