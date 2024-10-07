"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import MyEditor from "@/components/custom/MyEditor.custom";
import React from "react";

const AddArtical = () => {
  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/artical",
      name: "Articals",
    },
    {
      link: "/artical/add",
      name: "Create artical",
    },
  ];
  return (
    <div className="l-container">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="font-bold text-4xl text-center">New artical</h1>
      <div className="my-4 text-Dark">
        <MyEditor />
      </div>
    </div>
  );
};

export default AddArtical;
