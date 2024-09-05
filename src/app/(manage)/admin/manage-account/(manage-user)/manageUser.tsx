"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useQuery } from "@tanstack/react-query";
import { UserApis } from "@/services";
import { typeAccount } from "@/types";

const ManageUser = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["users"],
    queryFn: UserApis.getAllRoleUser,
    staleTime: 5 * 60 * 1000,
  });

  const arrs: typeAccount[] = data?.data || [];
  return (
    <div>
      {/* <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div> */}
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your users.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={arrs} />{" "}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUser;
