"use client";
import DetailsPtForm from "@/components/form/detailPt.form";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import { PTApis } from "@/services/pt.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/navigation";

export default function DetailPT({ params }: { params: { idPT: string } }) {
  const route = useRouter();
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Trang chủ",
    },
    {
      link: "/admin/manage-personal-trainer",
      name: "Quản lý huấn luyện viên",
    },
    {
      link: "#",
      name: "Chi tiết huấn luyện viên",
    },
  ];

  const { data, isLoading } = useQuery<any>({
    queryKey: ["personal-trainer"],
    queryFn: () => PTApis.getDetailsUser(params.idPT),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={() => route.back()}>Trở lại</ButtonCustom>
      </div>
      <DetailsPtForm data={data?.data} id={params.idPT} key={Date.now()} />
    </section>
  );
}
