"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { DeviceApis } from "@/services";
import DetailsDeviceForm from "@/components/form/detailDevice.form";

export default function DetailDevice({
  params,
}: {
  params: { idDevice: string };
}) {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-device",
      name: "Device management",
    },
    {
      link: "#",
      name: "Details Device",
    },
  ];
  const { data, isLoading } = useQuery<any>({
    queryKey: ["device"],
    queryFn: () => DeviceApis.getDetailsDevice(params.idDevice),
  });

  if (isLoading) {
    return <div>Skelonton</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom>Back</ButtonCustom>
      </div>
      <DetailsDeviceForm
        data={data?.data}
        id={params.idDevice}
        key={Date.now()}
      />
    </section>
  );
}
