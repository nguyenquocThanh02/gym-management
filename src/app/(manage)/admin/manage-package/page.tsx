"use client";

import { useQuery } from "@tanstack/react-query";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import Link from "next/link";
import { PackageApis } from "@/services";
import { typePackage, typeResponsePackage } from "@/types";
import ListPackage from "./list-package";

export default function DeviceManagePage() {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-package",
      name: "Package management",
    },
  ];

  const { data, isLoading } = useQuery<any>({
    queryKey: ["packages"],
    queryFn: PackageApis.getAllPackage,
  });

  const arrs: typeResponsePackage[] = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbCustom links={breadcrumbs} />
        <Link href={"/admin/manage-package/add"}>
          <ButtonCustom>Add new Package</ButtonCustom>
        </Link>
      </div>

      <ListPackage data={arrs} />
    </div>
  );
}
