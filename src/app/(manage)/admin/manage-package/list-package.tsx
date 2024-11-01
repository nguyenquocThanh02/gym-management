"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { typePackage, typeResponsePackage } from "@/types";
import { renderVND } from "@/utils";
import Link from "next/link";
import React from "react";

const ListPackage: React.FC<{ data: typeResponsePackage[] }> = ({ data }) => {
  return (
    <div className="mt-2">
      <Card x-chunk="dashboard-06-chunk-0 mt-3">
        <CardHeader>
          {" "}
          <div>
            <CardTitle>Gói tập</CardTitle>
            <CardDescription>Quản lý gói tập.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-5">
            {data?.map((item, index) => (
              <Link
                key={index}
                href={`/admin/manage-package/details/${item?.packages?._id}`}
              >
                <div className="border shadow-lg rounded-lg w-full hover:animate-pulse hover:cursor-pointer bg-slate-300  md:w-[254px] md:h-[240px] flex justify-center items-center">
                  <div className="text-center text-Light text-shadow">
                    <h2 className="text-xl font-bold">{index + 1}.</h2>
                    <h3 className="font-semibold text-lg ">
                      {item?.packages?.name}
                    </h3>
                    <p className="text-xl font-semibold ">
                      {renderVND(item?.packages?.price)}
                    </p>
                    <p>{item?.packages?.sessionWithPT} buổi với PT</p>
                    <p>{item?.packages?.duration} ngày thẻ thành viên</p>
                    <h3>
                      <Badge
                        className={`${
                          item?.packages?.status === "active"
                            ? "bg-green-900"
                            : "bg-Primary"
                        }`}
                      >
                        {item?.packages?.status}
                      </Badge>
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListPackage;
