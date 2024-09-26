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
import { formatDate } from "@/utils";
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

  const getDetailPackage = async (idPackage: string) => {
    const resultPackage = await PackageApis.getDetailsPackage(idPackage);
    if (resultPackage?.status === "200") {
      setThePackage(resultPackage?.data);
    } else {
      toast.error("Err: ", resultPackage?.message);
      setOpenPackage(false);
    }
  };

  const handleCancel = async (id: string | undefined) => {
    const resultCancel = await RegisterTrackingApis.cancelRegisterTracking(id);
    if (resultCancel?.status === "200") {
      setOpenCancel(false);
      refetch();
      toast.success("Cancel successfully");
    } else {
      toast.error("Error: ", resultCancel?.message);
    }
  };
  return (
    <div className="mt-4 rounded-t-md overflow-hidden">
      <table className="border-collapse border border-Light w-full">
        {theRT?.length < 1 ? (
          <>
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              You have not registered for any workout package.{" "}
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Click the star button to go to the package page and start your
                registration today. Sign up online to receive exciting
                promotions!
              </p>
            </caption>

            <caption className="border border-Light">
              <LinkArrow className="my-3" href="/package">
                Package page
              </LinkArrow>
            </caption>
          </>
        ) : (
          <>
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Your package information.
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Select <strong>Package</strong> and <strong>Payment</strong> to
                view its details. The package can only be canceled if you have
                not made a payment and within 2 days after it becomes effective.
              </p>
            </caption>
            <thead>
              <tr className="bg-Light/20">
                <th className="border border-slate-300 py-5">Package ID</th>
                <th className="border border-slate-300 py-5">Payment method</th>
                <th className="border border-slate-300 py-5">Time Start</th>
                <th className="border border-slate-300 py-5">Paid at</th>
                <th className="border border-slate-300 py-5">Discount</th>
                <th className="border border-slate-300 py-5">Total Price</th>
                <th className="border border-slate-300 py-5">Action</th>
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
                              Information this Package
                            </h3>
                            {thePackage ? (
                              <div className="flex justify-center">
                                <ul className="flex flex-col gap-3">
                                  <li>Name: {thePackage?.packages?.name}</li>
                                  <li>Type: {thePackage?.packages?.type}</li>
                                  <li>
                                    Price: {thePackage?.packages?.price} $
                                  </li>
                                  <li>
                                    Sessions with PT:{" "}
                                    {thePackage?.packages?.sessionWithPT}
                                  </li>
                                  <li>
                                    Duration: {thePackage?.packages?.duration}{" "}
                                    days
                                  </li>
                                  <li>
                                    Descriptions:{" "}
                                    {thePackage?.packages?.description}
                                  </li>
                                  <li>
                                    Suitable for:{" "}
                                    {thePackage?.packages?.suitableFor}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              <div>skeleton</div>
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
                              Information this payment
                            </h3>
                            <div className="flex justify-center">
                              <ul className="flex flex-col gap-3">
                                <li>
                                  Payment ID:{" "}
                                  {theInforRT?.payment?.orderId
                                    ? theInforRT?.payment?.orderId
                                    : "//"}
                                </li>
                                <li>
                                  Payer ID:{" "}
                                  {theInforRT?.payment?.payerId
                                    ? theInforRT?.payment?.payerId
                                    : "//"}
                                </li>
                                <li>
                                  Payer name:{" "}
                                  {theInforRT?.payment?.payerName
                                    ? theInforRT?.payment?.payerName
                                    : "//"}
                                </li>
                                <li>
                                  Payer email:{" "}
                                  {theInforRT?.payment?.payerEmail
                                    ? theInforRT?.payment?.payerEmail
                                    : "//"}
                                </li>
                                <li>
                                  Paid at: {formatDate(theInforRT?.paidAt)}
                                </li>
                                <li>
                                  Status:{" "}
                                  {theInforRT?.isPaid ? (
                                    <Badge>Payment</Badge>
                                  ) : (
                                    <Badge>None</Badge>
                                  )}
                                </li>
                                <li>
                                  Total price: {theInforRT?.package?.price}
                                </li>
                              </ul>
                            </div>
                          </DrawerDescription>
                          <DrawerFooter>
                            <Button
                              onClick={() => setOpenPayment(false)}
                              variant={"ghost"}
                            >
                              Close
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
                      ${item?.discount?.priceDescrease}
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      ${item?.totalPrice}
                    </td>
                    <td className="text-center my-1 border border-slate-300 py-5">
                      <Dialog open={openCancel} onOpenChange={setOpenCancel}>
                        <DialogTrigger
                          asChild
                          onClick={() => setRegisterTrackingId(item?._id || "")}
                        >
                          <Button variant="destructive">Cancel</Button>
                        </DialogTrigger>
                        {registerTrackingId && (
                          <DialogContent className="">
                            <DialogHeader>
                              <DialogTitle>
                                Cancel Register Tracking
                              </DialogTitle>
                              <DialogDescription>
                                You can only cancel your subscription within 3
                                days from the start date and if you have not
                                made a payment.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                onClick={() => setOpenCancel(false)}
                                className=""
                                variant={"outline"}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                onClick={() => handleCancel(registerTrackingId)}
                              >
                                Confirm
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
