"use client";
import LinkArrow from "@/components/custom/linkArrow.custom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { localStorageKey } from "@/constants/localStorage";
import { PackageApis, RegisterTrackingApis } from "@/services";
import {
  typePackage,
  typeRegisterTracking,
  typeResponsePackage,
} from "@/types";
import { formatDate, renderVND } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const DetailRegisterTrackingOfUser = () => {
  const userId = localStorage.getItem(localStorageKey?.userId) || "";
  const [thePackage, setThePackage] = useState<typeResponsePackage | null>(
    null
  );
  const [theInforRT, setTheInforRT] = useState<typeRegisterTracking | null>(
    null
  );
  const [registerTrackingId, setRegisterTrackingId] = useState<string>("");

  const [openPackage, setOpenPackage] = useState<boolean>(false);
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [openCancel, setOpenCancel] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["registerTrackingOfUser"],
    queryFn: () => RegisterTrackingApis.getAllRegisterTrackingsOfUser(userId),
  });
  const theRT: typeRegisterTracking[] = data?.data || [];
  console.log(theRT);

  const getDetailPackage = async (idPackage: string) => {
    const resultPackage = await PackageApis.getDetailsPackage(idPackage);
    if (resultPackage?.status === "200") {
      setThePackage(resultPackage?.data);
    } else {
      toast.error(resultPackage?.message);
      setOpenPackage(false);
    }
  };

  const handleCancel = async (id: string) => {
    const resultCancel = await RegisterTrackingApis.cancelRegisterTracking(id);
    if (resultCancel?.status === 200) {
      setOpenCancel(false);
      refetch();
      toast.success("Huỷ thành công");
    } else {
      toast.error(resultCancel?.message);
      setOpenCancel(false);
    }
  };
  return (
    <div className="mt-4 rounded-t-md overflow-hidden">
      <table className="border-collapse border border-Light w-full">
        {theRT?.length < 1 ? (
          <>
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Bạn chưa đăng ký gói tập luyện nào.{" "}
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Nhấn vào nút sao để đến trang gói và bắt đầu đăng ký ngay hôm
                nay. Đăng ký trực tuyến để nhận những khuyến mãi hấp dẫn!
              </p>
            </caption>

            <caption className="border border-Light">
              <LinkArrow className="my-3" href="/package">
                Chi tiết gói tập
              </LinkArrow>
            </caption>
          </>
        ) : (
          <>
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Thông tin gói tập.
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Chọn <strong>Gói</strong> và{" "}
                <strong>Phương thức thanh toán</strong> để xem chi tiết. Gói chỉ
                có thể được hủy nếu bạn chưa thực hiện thanh toán và trong vòng
                2 ngày sau khi nó có hiệu lực.
              </p>
            </caption>
            <thead>
              <tr className="bg-Light/20">
                <th className="border border-slate-300 py-5">ID Gói</th>
                <th className="border border-slate-300 py-5">
                  Phương thức thanh toán
                </th>
                <th className="border border-slate-300 py-5">
                  Thời gian bắt đầu
                </th>
                <th className="border border-slate-300 py-5">
                  Ngày thanh toán
                </th>
                <th className="border border-slate-300 py-5">Giảm giá</th>
                <th className="border border-slate-300 py-5">Tổng giá</th>
                <th className="border border-slate-300 py-5">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {theRT.length > 0 &&
                theRT?.map((item: typeRegisterTracking, index) => (
                  <tr key={index}>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      <Drawer open={openPackage} onOpenChange={setOpenPackage}>
                        <DrawerTrigger
                          onClick={() =>
                            getDetailPackage(item?.package?.idPackage)
                          }
                        >
                          {item?.package?.idPackage}
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerDescription>
                            <h3 className="text-center mb-3 mt-5 font-bold text-base">
                              Thông tin gói tập
                            </h3>
                            {thePackage ? (
                              <div className="flex justify-center">
                                <ul className="flex flex-col gap-3">
                                  <li>Tên: {thePackage?.packages?.name}</li>
                                  <li>Loại: {thePackage?.packages?.type}</li>
                                  <li>
                                    Giá:{" "}
                                    {renderVND(thePackage?.packages?.price)}
                                  </li>
                                  <li>
                                    Số buổi có người hướng dẫn:{" "}
                                    {thePackage?.packages?.sessionWithPT}
                                  </li>
                                  <li>
                                    Thời gian: {thePackage?.packages?.duration}{" "}
                                    ngày
                                  </li>
                                  <li>
                                    Mô tả: {thePackage?.packages?.description}
                                  </li>
                                  <li>
                                    Phù hợp cho:{" "}
                                    {thePackage?.packages?.suitableFor}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              <div>Loading</div>
                            )}
                          </DrawerDescription>
                          <DrawerFooter>
                            <Button
                              onClick={() => setOpenPackage(false)}
                              variant={"ghost"}
                            >
                              Close
                            </Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      <Drawer open={openPayment} onOpenChange={setOpenPayment}>
                        <DrawerTrigger onClick={() => setTheInforRT(item)}>
                          {item?.paymentMethod}
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerDescription>
                            <h3 className="text-center mb-3 mt-5 font-bold text-base">
                              Thông tin thanh toán
                            </h3>
                            <div className="flex justify-center">
                              <ul className="flex flex-col gap-3">
                                <li>
                                  ID thanh toán:{" "}
                                  {theInforRT?.payment?.orderId
                                    ? theInforRT?.payment?.orderId
                                    : "//"}
                                </li>
                                <li>
                                  ID thanh toán:{" "}
                                  {theInforRT?.payment?.payerId
                                    ? theInforRT?.payment?.payerId
                                    : "//"}
                                </li>
                                <li>
                                  Tên người thanh toán:{" "}
                                  {theInforRT?.payment?.payerName
                                    ? theInforRT?.payment?.payerName
                                    : "//"}
                                </li>
                                <li>
                                  Email thanh toán:{" "}
                                  {theInforRT?.payment?.payerEmail
                                    ? theInforRT?.payment?.payerEmail
                                    : "//"}
                                </li>
                                <li>
                                  Thanh toán lúc:{" "}
                                  {theInforRT?.paidAt
                                    ? formatDate(theInforRT?.paidAt)
                                    : "//"}
                                </li>
                                <li>
                                  Status:{" "}
                                  {theInforRT?.isPaid ? (
                                    <Badge>Đã thanh toán</Badge>
                                  ) : (
                                    <Badge>Chưa thanh toán</Badge>
                                  )}
                                </li>
                                <li>
                                  Tổng tiền: {renderVND(theInforRT?.totalPrice)}
                                </li>
                              </ul>
                            </div>
                          </DrawerDescription>
                          <DrawerFooter>
                            <Button
                              onClick={() => setOpenPayment(false)}
                              variant={"ghost"}
                            >
                              Đóng
                            </Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      {formatDate(item?.timeStart)}
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      {item?.paidAt ? formatDate(item?.paidAt) : "None"}
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      {renderVND(item?.discount?.priceDescrease)}
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      {renderVND(item?.totalPrice)}
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      <Dialog open={openCancel} onOpenChange={setOpenCancel}>
                        <DialogTrigger
                          asChild
                          onClick={() => setRegisterTrackingId(item?._id || "")}
                        >
                          <Button variant="destructive">Huỷ</Button>
                        </DialogTrigger>
                        {registerTrackingId && (
                          <DialogContent className="">
                            <DialogHeader>
                              <DialogTitle>Huỷ đăng ký</DialogTitle>
                              <DialogDescription>
                                Bạn chỉ có thể hủy đăng ký của mình trong vòng 3
                                ngày kể từ ngày bắt đầu và nếu bạn chưa thực
                                hiện thanh toán.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                onClick={() => setOpenCancel(false)}
                                className=""
                                variant={"outline"}
                              >
                                Huỷ
                              </Button>
                              <Button
                                type="submit"
                                onClick={() => handleCancel(registerTrackingId)}
                              >
                                Xác nhận
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default DetailRegisterTrackingOfUser;
