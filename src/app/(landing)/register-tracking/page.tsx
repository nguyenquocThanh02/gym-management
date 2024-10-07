import React from "react";
import DetailRegisterTrackingOfUser from "./detailRegisterTracking.component";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";

const RegisterTrackingPage = () => {
  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/register-tracking",
      name: "Register Tracking",
    },
  ];
  return (
    <div className="l-container  py-10">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center font-bold text-4xl">My register tracking</h1>
      <DetailRegisterTrackingOfUser />
    </div>
  );
};

export default RegisterTrackingPage;
