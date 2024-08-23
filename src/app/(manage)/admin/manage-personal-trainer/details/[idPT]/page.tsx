"use client";
import DetailsPtForm from "@/components/form/detailPt.form";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import { PTApis } from "@/services/pt.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function DetailPT({ params }: { params: { idPT: string } }) {
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "/admin/manage-personal-trainer",
      name: "PT management",
    },
    {
      link: "#",
      name: "Details PT",
    },
  ];
  const { data, isLoading } = useQuery<any>({
    queryKey: ["personal-trainer"],
    queryFn: () => PTApis.getDetailsUser(params.idPT),
  });

  if (isLoading) {
    return <div>Skelonton</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom>Back</ButtonCustom>
      </div>
      <DetailsPtForm data={data?.data} id={params.idPT} key={Date.now()} />
    </section>
  );
}
