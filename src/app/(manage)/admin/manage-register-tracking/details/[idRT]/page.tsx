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
import { Badge } from "@/components/ui/badge";

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

  const registerTracking: typeRegisterTracking = data?.data || null;

  return (
    <section>
      <div className="flex justify-between items-center w-full mb-2">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={handleBack}>Back</ButtonCustom>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>
            Mã các đăng ký:{" "}
            <Badge className="font-light text-base bg-slate-600">
              {registerTracking?._id}
            </Badge>
          </CardTitle>
          <CardDescription>
            Bạn có thể xem và bắt đầu thanh toán cho việc đăng ký theo dõi tại
            đây.
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
