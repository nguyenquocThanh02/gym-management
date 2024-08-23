import DetailsPtForm from "@/components/form/detailPt.form";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import React from "react";

const AddPT = () => {
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
      link: "/admin/manage-personal-trainer/add-pt",
      name: "Add PT",
    },
  ];
  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom>Back</ButtonCustom>
      </div>
      <DetailsPtForm data={null} id="" />
    </section>
  );
};

export default AddPT;
