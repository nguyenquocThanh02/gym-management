"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { DeviceApis } from "@/services";
import DetailsDeviceForm from "@/components/form/detailDevice.form";
import { useRouter } from "next/navigation";

export default function DetailDevice({
  params,
}: {
  params: { idDevice: string };
}) {
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
      name: "Chi tiết thiết bị",
    },
  ];

  const { data, isLoading } = useQuery<any>({
    queryKey: ["device"],
    queryFn: () => DeviceApis.getDetailsDevice(params.idDevice),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={() => route.back()}>Trở lại</ButtonCustom>
      </div>
      <DetailsDeviceForm
        data={data?.data}
        id={params.idDevice}
        key={Date.now()}
      />
    </section>
  );
}
