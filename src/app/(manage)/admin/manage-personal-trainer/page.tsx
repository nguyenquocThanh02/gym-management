"use client";

import { PTApis } from "@/services/pt.service";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import Link from "next/link";
import { typePT } from "@/types/pt.type";

export default function PTManagePage() {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-personal-trainer",
      name: "PT management",
    },
  ];

  const { data, isLoading } = useQuery<any>({
    queryKey: ["personal-trainers"],
    queryFn: PTApis.getAllPT,
  });

  const arrs: typePT[] = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbCustom links={breadcrumbs} />
        <Link href={"/admin/manage-personal-trainer/add-pt"}>
          <ButtonCustom>Add new PT</ButtonCustom>
        </Link>
      </div>
      <DataTable columns={columns} data={arrs} />{" "}
    </div>
  );
}
