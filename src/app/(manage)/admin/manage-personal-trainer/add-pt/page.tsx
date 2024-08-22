import AddPtForm from "@/components/logic/addPtForm.component";
import DetailsPtForm from "@/components/logic/detailPtForm.component";
import { BreadcrumbCustom } from "@/components/ui/breadscrumbCustom";
import ButtonCustom from "@/components/ui/buttonCustom";
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
