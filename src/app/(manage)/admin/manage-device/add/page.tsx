"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import React from "react";
import { useRouter } from "next/navigation";
import DetailsDeviceForm from "@/components/form/detailDevice.form";

const AddDevice = () => {
  const route = useRouter();
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Trang chủ",
    },
    {
      link: "/admin/manage-device",
      name: "Quản lý thiết bị",
    },
    {
      link: "#",
      name: "Thêm thiết bị",
    },
  ];

  const handleBack = () => {
    route.back();
  };
  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={handleBack}>Trở về</ButtonCustom>
      </div>
      <DetailsDeviceForm data={null} id="" />
    </section>
  );
};

export default AddDevice;
