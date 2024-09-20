import ButtonCustom from "@/components/custom/button.custom";
import WaitingLayout from "@/components/layout/waiting.layout";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { localStorageKey } from "@/constants/localStorage";
import { RegisterTrackingApis } from "@/services";
import mainStore from "@/store/main.store";
import { typeRegisterTracking } from "@/types";
import { Dialog } from "@radix-ui/react-dialog";
import { Switch } from "@radix-ui/react-switch";
import React, { useState } from "react";
import { toast } from "sonner";

const PaymentRegister = () => {
  const { inforUser, inforPackage } = mainStore();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("offline");

  const sumDiscount = (arrs): number => {
    let sum = 0;
    arrs?.map((item) => {
      sum += item?.percent;
    });
    return sum;
  };

  const totalPrice = (price: any, discount: number) => {
    return Number((price * (100 - discount)) / 100);
  };

  const handleTimeDate = (
    timeStart: any,
    duration: number | string
  ): string => {
    const timeEnd = new Date(
      new Date(timeStart).getTime() + Number(duration) * 24 * 60 * 60 * 1000
    );
    return timeEnd;
  };

  const handleRegisterTracking = async () => {
    setLoading(true);
    const dataRegisterTracking: typeRegisterTracking = {
      package: {
        price: inforPackage?.packages?.price,
        name: inforPackage?.packages?.name,
        idPackage: inforPackage?.packages?._id || "",
      },
      user: {
        fullName: inforUser?.fullName,
        email: inforUser?.email,
        phone: inforUser?.phone || "",
        idUser: localStorage.getItem(localStorageKey?.userId) || undefined,
      },
      discount: {
        priceDescrease:
          (sumDiscount(inforPackage?.discount) *
            Number(inforPackage?.packages?.price)) /
            100 || 0,
        idDiscount:
          inforPackage?.discount?.map((discount) => discount._id) || undefined,
      },
      paymentMethod: paymentMethod,
      totalPrice: totalPrice(
        inforPackage?.packages?.price,
        sumDiscount(inforPackage?.discount)
      ),
      isPaid: isPaid,
      paidAt: isPaid ? Date.now() : undefined,
      timeStart: inforUser?.timeStart,
      timeEnd: new Date(
        handleTimeDate(inforUser?.timeStart, inforPackage?.packages?.duration)
      ),
    };

    const result = await RegisterTrackingApis.addRegisterTracking(
      dataRegisterTracking
    );
    if (result?.status === "201") {
      setOpen(false);
      toast.success("Successfully to register package");
    } else {
      setOpen(true);
      toast.error(result?.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <WaitingLayout />;
  }
  return (
    <div>
      <div className="mt-3 flex gap-3">
        Payment with paypal
        <Switch className="" />
      </div>
      {/* <div className="">
        {!true ? (
          <Button className="w-full mt-4">Register</Button>
        ) : (
          <Button variant="ghost" className="w-full mt-4 border" disabled>
            Register
          </Button>
        )}
      </div> */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ButtonCustom className="w-full mt-4">Register</ButtonCustom>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-center">Card infor</DialogTitle>
            <DialogDescription className="text-center">
              This is your package. Click <strong>confirm</strong> to complete.
            </DialogDescription>
          </DialogHeader>
          <hr />
          <div className="flex justify-evenly gap-4">
            <ul className="list-inside">
              <h3 className="text-center font-semibold">Package: </h3>
              <li>Name: {inforPackage?.packages?.name}</li>
              <li>Price: {inforPackage?.packages?.price}</li>
            </ul>
            <ul>
              <h3 className="text-center font-semibold">User: </h3>
              <li>Name: {inforUser?.fullName}</li>
              <li>Email: {inforUser?.email}</li>
              <li>Phone: {inforUser?.phone}</li>
            </ul>
          </div>
          <hr />
          <div className="flex justify-center gap-3">
            <Button
              variant={"outline"}
              className="border border-Dark/70"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleRegisterTracking} type="submit">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentRegister;
