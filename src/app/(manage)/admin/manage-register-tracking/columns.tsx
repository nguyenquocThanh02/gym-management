"use client";

import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowDownUp, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils";
import { typeRegisterTracking } from "@/types";

export const columns: ColumnDef<typeRegisterTracking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "packageName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Package name
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("packageName")}</div>
    ),
  },
  {
    accessorKey: "packageId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Package ID
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }: { row: any }) => {
      const packageId: string | undefined = row.getValue("packageId");
      return packageId ? (
        <Link
          href={`/admin/manage-package/details/${packageId}`}
          className="lowercase hover:underline"
        >
          {packageId}
        </Link>
      ) : (
        <div>None</div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }: { row: any }) => {
      const userId: string | undefined = row.getValue("userId");
      return userId ? (
        <Link
          href={`/admin/manage-account/details/${userId}`}
          className="lowercase hover:underline"
        >
          {userId}
        </Link>
      ) : (
        <div>None</div>
      );
    },
  },
  {
    accessorKey: "userFullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("userFullName")}</div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("totalPrice")}$</div>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "Payment",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isPaid") ? "Completed" : "None"}{" "}
      </div>
    ),
  },
  {
    accessorKey: "paidAt",
    header: () => <div className="text-right">Paid at</div>,
    cell: ({ row }: { row: any }) => {
      const dateValue: string | undefined = row.getValue("paidAt");

      const formattedDate = formatDate(dateValue);
      return (
        <div className="text-right">{dateValue ? formattedDate : "None"}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item._id || "")}
              >
                Copy discount ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`/admin/manage-register-tracking/details/${item._id}`}
                >
                  View details
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
