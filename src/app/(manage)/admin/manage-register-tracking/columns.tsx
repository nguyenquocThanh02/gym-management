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
import { formatDate, renderVND } from "@/utils";
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
    accessorKey: "packageId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã gói tập
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
        <div>Không có</div>
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
          Mã người dùng
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
        <div>Không có</div>
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
          Tên người dùng
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => <div className="">{row.getValue("userFullName")}</div>,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tổng tiền
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="">{renderVND(row.getValue("totalPrice"))}</div>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "Đã thanh toán?",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isPaid") ? "Đã thanh toán" : "Chưa"}{" "}
      </div>
    ),
  },
  {
    accessorKey: "paidAt",
    header: () => <div className="text-right">Thanh toán lúc:</div>,
    cell: ({ row }: { row: any }) => {
      const dateValue: string | undefined = row.getValue("paidAt");

      const formattedDate = formatDate(dateValue);
      return (
        <div className="text-right">{dateValue ? formattedDate : "Chưa"}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Hành động</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Mở menu</span>
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành dộng</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item._id || "")}
              >
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`/admin/manage-register-tracking/details/${item._id}`}
                >
                  Xem chi tiết
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
