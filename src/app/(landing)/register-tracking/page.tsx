import React from "react";
import DetailRegisterTrackingOfUser from "./detailRegisterTracking.component";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";

const RegisterTrackingPage = () => {
  const breadcrumbs = [
    {
      link: "/",
      name: "Trang chủ",
    },
    {
      link: "/register-tracking",
      name: "Theo dõi đăng ký",
    },
  ];
  return (
    <div className="l-container  py-10">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center font-bold text-4xl">
        Thông tin gói tập của tôi
      </h1>
      <DetailRegisterTrackingOfUser />
    </div>
  );
};

export default RegisterTrackingPage;
