"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import ButtonCustom from "@/components/custom/button.custom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { UserApis } from "@/services";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { typeAccount } from "@/types";
import { formatDate } from "@/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DetailAccount({
  params,
}: {
  params: { idAccount: string };
}) {
  const route = useRouter();
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Trang chủ",
    },
    {
      link: "/admin/manage-account",
      name: "Quản lý tài khoản",
    },
    {
      link: "#",
      name: "Chi tiết tài khoản",
    },
  ];

  const [open, setOpen] = React.useState<boolean>(false);
  const [openPermiss, setOpenPermiss] = React.useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery<any>({
    queryKey: ["account"],
    queryFn: () => UserApis.getDetailsUser(params.idAccount),
  });

  const account: typeAccount = data?.data || null;

  if (isLoading) {
    return <div>Loading</div>;
  }

  const handleChangeStatus = async () => {
    try {
      const statusChange = account?.status === "active" ? "block" : "active";
      const result = await UserApis.changeStatus(
        account._id || "",
        statusChange
      );
      if (result?.status === "200") {
        toast.success("Update status successfully");
        refetch();
      } else {
        toast.error(result?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }
    setOpen(false);
  };

  const handleChangeRole = async () => {
    try {
      const roleChange = account?.role === "user" ? "trainee" : "user";
      const result = await UserApis.changeRole(account._id || "", roleChange);
      if (result?.status === "200") {
        toast.success("Cập nhật quyền thành công");
        refetch();
      } else {
        toast.error(result?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }
    setOpenPermiss(false);
  };

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <BreadcrumbCustom links={breadcrumbs} />
        <ButtonCustom onClick={() => route.back()}>Trở lại</ButtonCustom>
      </div>
      <Card x-chunk="dashboard-06-chunk-0 mt-3">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Nhân viên</CardTitle>
              <CardDescription>Quản lý nhân viên.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={openPermiss} onOpenChange={setOpenPermiss}>
                <DialogTrigger asChild>
                  <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                    Thay đổi quyền
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Thay đổi quyền tài khoản</DialogTitle>
                    <DialogDescription>
                      Bạn có chắc chắn muốn{" "}
                      {account?.role === "user" ? "cấp phép " : "thu hồi "}
                      quyền nhân viên của tài khoản
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Đóng
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleChangeRole}>
                      Xác nhận
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                    Thay đổi trạng thái
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Status</DialogTitle>
                    <DialogDescription>
                      Bạn có chắc chắn muốn{" "}
                      {account?.status === "active" ? "khoá " : "mở khoá "} tài
                      khoản?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Đóng
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleChangeStatus}>
                      Xác nhận
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex items-center justify-center space-x-4">
              <Image
                className="rounded-full border border-slate-300"
                src={account?.avatar || ""}
                width={180}
                height={180}
                alt="Avata"
              />
              <div className="font-medium">
                <h5 className="text-3xl font-semibold text-gray-900 mb-3">
                  {account?.fullName}
                </h5>
                <span className="text-xl text-gray-500">{account?.email}</span>
              </div>
            </div>
            <div className="w-1/2 h-fit p-4 border shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th colSpan={2} className="pb-3 text-lg">
                      Thông tin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-2">
                      <strong>Tên tài khoản:</strong>
                    </td>
                    <td className="border border-slate-300 p-2">
                      {account?.accountName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">
                      <strong>Quyền:</strong>
                    </td>
                    <td className="border border-slate-300 p-2">
                      {account?.role}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">
                      <strong>Điện thoại:</strong>
                    </td>
                    <td className="border border-slate-300 p-2">
                      {account?.phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">
                      <strong>Ngày sinh:</strong>
                    </td>
                    <td className="border border-slate-300 p-2">
                      {formatDate(account?.dateOfBirth)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">
                      <strong>Trạng thái:</strong>
                    </td>
                    <td className="border border-slate-300 p-2">
                      <Badge
                        className={` ${
                          account?.status === "active"
                            ? "bg-green-800"
                            : "bg-Primary"
                        }`}
                      >
                        {account?.status}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">
                      <strong>Ngày tạo:</strong>
                    </td>
                    <td className="border border-slate-300 p-2">
                      {formatDate(account?.createdAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
