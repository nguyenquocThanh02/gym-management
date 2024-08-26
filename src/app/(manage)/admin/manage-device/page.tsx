"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import Link from "next/link";
import { typeDevice } from "@/types";
import { DeviceApis } from "@/services";

export default function DeviceManagePage() {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-device",
      name: "Device management",
    },
  ];

  const { data, isLoading } = useQuery<any>({
    queryKey: ["devices"],
    queryFn: DeviceApis.getAllDevice,
  });

  const arrs: typeDevice[] = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbCustom links={breadcrumbs} />
        <Link href={"/admin/manage-device/add"}>
          <ButtonCustom>Add new Device</ButtonCustom>
        </Link>
      </div>
      <DataTable columns={columns} data={arrs} />{" "}
    </div>
  );
}
