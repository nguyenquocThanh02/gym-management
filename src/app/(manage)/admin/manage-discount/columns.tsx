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
import { typeDiscount } from "@/types/discount.type";

export const columns: ColumnDef<typeDiscount>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={`capitalize ${
          row.getValue("status") === "active" ? "bg-green-800" : "bg-Primary"
        }`}
      >
        {row.getValue("status") === "active" ? "running" : "stopped"}
      </Badge>
    ),
  },
  {
    accessorKey: "percent",
    header: "Percent",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("percent")} %</div>
    ),
  },
  {
    accessorKey: "validFrom",
    header: () => <div className="text-right">Từ ngày</div>,
    cell: ({ row }: { row: any }) => {
      const dateValue: string | undefined = row.getValue("validFrom");

      const formattedDate = formatDate(dateValue);
      return <div className="text-right font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "validTo",
    header: () => <div className="text-right">Đến ngày</div>,
    cell: ({ row }: { row: any }) => {
      const dateValue: string | undefined = row.getValue("validTo");

      const formattedDate = formatDate(dateValue);
      return <div className="text-right font-medium">{formattedDate}</div>;
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
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item._id || "")}
              >
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/admin/manage-discount/details/${item._id}`}>
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
