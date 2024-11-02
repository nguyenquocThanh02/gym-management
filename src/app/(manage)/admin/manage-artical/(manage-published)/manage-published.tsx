"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { typeArtical } from "@/types";
import { ArticalApis } from "@/services";
import { columns } from "../columns";
import { DataTable } from "../data-table";

const ManagePublished = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["articals-published"],
    queryFn: () => ArticalApis.getAllArticals("published"),
  });

  const arrs: typeArtical[] = data?.data || [];

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Các bài viết đang công khai</CardTitle>
              <CardDescription>
                Quản lý các bài viết đang công khai.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={arrs} />{" "}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePublished;
