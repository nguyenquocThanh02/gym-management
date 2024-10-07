"use client";
import CardArtical from "@/components/normal/cardArtical.component";
import { localStorageKey } from "@/constants/localStorage";
import { ArticalApis } from "@/services";
import { typeArtical } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ArticalOfUserComponent: React.FC<{ status: string }> = ({ status }) => {
  const idUser = localStorage.getItem(localStorageKey.userId) || "";
  const { data, isLoading } = useQuery({
    queryKey: [`artical-${status}`],
    queryFn: () => ArticalApis.getArticalsOfUser(idUser, status),
    staleTime: 5 * 60 * 1000,
  });
  const theArtical: typeArtical[] = data?.data || null;
  return (
    <div className="mb-8 mt-5">
      {theArtical?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
          {theArtical?.map((item, index) => (
            <div
              data-aos={"fade-up"}
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <CardArtical theArtical={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <p className="text-center font-semibold text-2xl my-5">
            You still do not have any articles. Lets start by creating a new
            article.
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticalOfUserComponent;
