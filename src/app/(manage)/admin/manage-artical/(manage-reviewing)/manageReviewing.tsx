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

const ManageReviewing = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["articals-reviewing"],
    queryFn: () => ArticalApis.getAllArticals("reviewing"),
    staleTime: 5 * 60 * 1000,
  });

  const arrs: typeArtical[] = data?.data || [];

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Reviewing articals</CardTitle>
              <CardDescription>Manage your reviewing articals.</CardDescription>
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

export default ManageReviewing;
