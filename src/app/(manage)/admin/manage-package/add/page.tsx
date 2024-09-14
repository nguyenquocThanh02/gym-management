"use client";
import DetailsPtForm from "@/components/form/detailPt.form";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import React from "react";
import { useRouter } from "next/navigation";
import DetailsPackageForm from "@/components/form/detailPackage.form";

const AddPackage = () => {
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
  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={handleBack}>Back</ButtonCustom>
      </div>
      <DetailsPackageForm data={null} id="" />
    </section>
  );
};

export default AddPackage;
