"use client";

import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterTrackingApis } from "@/services";
import { typeRegisterTracking } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const RegisterTrackingManagePage = () => {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-register-tracking",
      name: "Register tracking management",
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["registerTrackings"],
    queryFn: () => RegisterTrackingApis.getAllRegisterTrackings(),
  });
  const arrs: typeRegisterTracking[] = data?.data || [];

  if (isLoading) {
    <div>Skeleton page</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbCustom links={breadcrumbs} />
        <Link href={"/admin/manage-register-tracking/add"}>
          <ButtonCustom>Register tracking</ButtonCustom>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Register tracking</CardTitle>
          <CardDescription>Manage all register trackings.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={arrs} />{" "}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterTrackingManagePage;
