"use client";
import { Button } from "@/components/ui/button";
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
import { RegisterTrackingApis } from "@/services";
import { typeRegisterTracking } from "@/types";
import { formatDate } from "@/utils";
import Link from "next/link";
import React, { use, useState } from "react";
import { toast } from "sonner";

const DetailsRegisterTrackingComponent: React.FC<{
  data: typeRegisterTracking;
}> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handlePayment = async () => {
    const paymentResult = await RegisterTrackingApis.paymentRegisterTracking(
      data?._id || ""
    );
    if (paymentResult?.status === "200") {
      toast.success("Payment successfully");
      location.reload();
    } else {
      setOpen(false);
      toast.error("Err: ", paymentResult?.message);
    }
  };
  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex gap-3">
          {!data?.isPaid && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                  Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Payment service</DialogTitle>
                  <DialogDescription>
                    By confirm payment service you will complete payment for
                    this register tracking. Click <strong>confirm</strong> to
                    complete.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button onClick={handlePayment}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="text-Primary bg-Light border-Primary border hover:bg-Tertiary/20">
                  Invite account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Status</DialogTitle>
                  <DialogDescription>
                    <Form {...form}>
                      <form className="space-y-8">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="abc@gmail.com"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Invite
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
        </div>
      </div>
      <hr />
      <div className="flex justify-around gap-8 mt-4">
        <div>
          <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
            Package
          </h3>
          <ul className="shadow-sm p-2">
            <li className="flex gap-3 my-5 items-center">
              Name:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.package?.name}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Price:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                ${data?.package?.price}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Time start:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {formatDate(data?.timeStart)}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Time end:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {formatDate(data?.timeEnd)}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              ID package:{" "}
              <Link
                href={`/admin/manage-package/details/${data?.package?.idPackage}`}
                className="border p-1 bg-slate-300 rounded-md"
              >
                {data?.package?.idPackage}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
            User
          </h3>
          <ul className="shadow-sm p-2">
            <li className="flex gap-3 my-5 items-center">
              Full name:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.user?.fullName}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Email:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.user?.email}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Phone:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.user?.phone}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              ID user:{" "}
              <Link
                href={`/admin/manage-user/details/${data?.user?.idUser}`}
                className="border p-1 bg-slate-300 rounded-md"
              >
                {data?.user?.idUser}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
            Overall
          </h3>
          <ul className="shadow-sm p-2">
            <li className="flex gap-3 my-5 items-center">
              Discount:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                ${data?.discount?.priceDescrease}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Total price:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                ${data?.totalPrice}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Payment method:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.paymentMethod}
              </p>
            </li>
            <li className="flex gap-3 my-5 items-center">
              Is paid?:{" "}
              <p className="border p-1 bg-slate-50 rounded-md">
                {data?.isPaid ? "Yes" : "No"}
              </p>
            </li>
          </ul>
        </div>
        {data?.isPaid && (
          <div>
            <h3 className="text-center p-1 font-semibold  shadow-sm border-Dark/50">
              Payment
            </h3>
            <ul className="shadow-sm p-2">
              <li className="flex gap-3 my-5 items-center">
                Payment ID:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.orderId || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Payer ID:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.payerId || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Payer name:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.payerName || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Payer email:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {data?.payment?.payerEmail || "//"}
                </p>
              </li>
              <li className="flex gap-3 my-5 items-center">
                Payment at:{" "}
                <p className="border p-1 bg-slate-50 rounded-md">
                  {formatDate(data?.paidAt)}
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsRegisterTrackingComponent;
