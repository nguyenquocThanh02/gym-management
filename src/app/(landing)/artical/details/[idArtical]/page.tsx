"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import NewArticals from "@/components/normal/newArtical.component";
import { Badge } from "@/components/ui/badge";
import { ArticalApis } from "@/services";
import { formatDate } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ContactRound, UserRoundPen } from "lucide-react";
import React from "react";

const DetailsArtical = ({ params }: { params: { idArtical: string } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["artical"],
    queryFn: () => ArticalApis?.getDetailsArtical(params?.idArtical),
  });

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
      link: "/#",
      name: "Details",
    },
  ];
  return (
    <div className="l-container">
      <BreadcrumbCustom links={breadcrumbs} />
      {data?.data ? (
        <div className="bg-Light/10 p-5">
          <h2 className="text-lg font-bold">{data?.data?.title}</h2>
          <div className="flex gap-3 mt-3">
            <Badge className="text-sm" variant={"secondary"}>
              <Calendar className="mr-1" size={15} />
              {formatDate(data?.data?.updatedAt)}
            </Badge>
            <Badge className="text-sm" variant={"secondary"}>
              <UserRoundPen className="mr-1" size={15} />
              {data?.data?.author?.name}
            </Badge>
          </div>
          <hr className="mt-5" />
          <div
            className="ck-content"
            dangerouslySetInnerHTML={{ __html: data?.data?.content }}
          ></div>
        </div>
      ) : (
        <div>
          <h2>Have error when loading artical ${params?.idArtical}</h2>
        </div>
      )}
      <div data-aos={"fade-up"} className="my-10">
        <h2 className="text-Primary text-shadow  text-3xl font-bold mb-2">
          New articals
        </h2>
        <NewArticals />
      </div>
    </div>
  );
};

export default DetailsArtical;
