"use client";

import { useQuery } from "@tanstack/react-query";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import Link from "next/link";
import { typeDevice } from "@/types";
import { DeviceApis, DiscountApis } from "@/services";
import { typeDiscount } from "@/types/discount.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function DiscountManagePage() {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-discount",
      name: "Discount management",
    },
  ];

  const { data, isLoading } = useQuery<any>({
    queryKey: ["discounts"],
    queryFn: DiscountApis.getAllDiscounts,
  });

  const arrs: typeDiscount[] = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbCustom links={breadcrumbs} />
        <Link href={"/admin/manage-discount/add"}>
          <ButtonCustom>Add new Discount</ButtonCustom>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Discounts</CardTitle>
          <CardDescription>Manage your discounts.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={arrs} />{" "}
        </CardContent>
      </Card>
    </div>
  );
}
