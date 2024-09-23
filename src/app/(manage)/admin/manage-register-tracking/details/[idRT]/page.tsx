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
import { useRouter } from "next/navigation";
import React from "react";
import DetailsRegisterTrackingComponent from "./detailsRegisterTracking.component";
import { Button } from "@/components/ui/button";

const DetailsRegisterPackage = ({ params }: { params: { idRT: string } }) => {
  const route = useRouter();

  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-register-tracking",
      name: "Register tracking management",
    },
    {
      link: "#",
      name: "Details register tracking",
    },
  ];

  const handleBack = () => {
    route.back();
  };

  const { data } = useQuery({
    queryKey: ["registerTracking"],
    queryFn: () =>
      RegisterTrackingApis.getDetailsRegisterTracking(params?.idRT),
  });

  console.log(params.idRT);
  console.log(data);
  const registerTracking: typeRegisterTracking = data?.data || null;

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={handleBack}>Back</ButtonCustom>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>
            Register tracking ID:{" "}
            <span className="font-light">{registerTracking?._id}</span>
          </CardTitle>
          <CardDescription>
            You can view and start to payment for register tracking at here.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <DetailsRegisterTrackingComponent data={registerTracking} />
        </CardContent>
      </Card>
    </section>
  );
};

export default DetailsRegisterPackage;
