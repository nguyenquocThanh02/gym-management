"use client";
import React from "react";

import WaitingLayout from "@/components/layout/waiting.layout";
import { localStorageKey } from "@/constants/localStorage";
import { useQuery } from "@tanstack/react-query";
import { UserApis } from "@/services";
import ProfileForm from "@/components/form/profileForm.form";
import { typeAccount } from "@/types";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";

const ProfilePage: React.FC<{}> = () => {
  const idUser = localStorage.getItem(localStorageKey?.userId) || "";
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserApis.getDetailsUser(idUser),
  });

  const theUser: typeAccount = data?.data || null;
  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/profile",
      name: "Profile",
    },
  ];
  return (
    <div className="l-container mb-10">
      {isLoading && <WaitingLayout />}
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center text-3xl font-semibold text-shadow">
        My Account
      </h1>
      <ProfileForm data={theUser} key={Date.now()} />
    </div>
  );
};

export default ProfilePage;
