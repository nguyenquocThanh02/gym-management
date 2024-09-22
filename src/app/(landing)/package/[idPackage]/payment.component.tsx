import ButtonCustom from "@/components/custom/button.custom";
import WaitingLayout from "@/components/layout/waiting.layout";
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
import { localStorageKey } from "@/constants/localStorage";
import { RegisterTrackingApis } from "@/services";
import mainStore from "@/store/main.store";
import { typePayment, typeRegisterTracking } from "@/types";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { PayPalButton } from "react-paypal-button-v2";
import { Switch } from "@/components/ui/switch";

const PaymentRegister = () => {
  const { inforUser, inforPackage, confirmInforRegister } = mainStore();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paypal, setPaypal] = useState<boolean>(false);

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

  const handleTimeDate = (timeStart: any, duration: number | string) => {
    const timeEnd = new Date(
      new Date(timeStart).getTime() + Number(duration) * 24 * 60 * 60 * 1000
    );
    return timeEnd;
  };

  const handleRegisterTracking = async (paypal: typePayment = {}) => {
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
      payment: {
        payerName: paypal?.payerName || undefined,
        payerEmail: paypal?.payerEmail || undefined,
        payerId: paypal?.payerId || undefined,
        orderId: paypal?.orderId || undefined,
      },
      paymentMethod: paypal?.isPaid ? "paypal" : "offline",
      totalPrice: totalPrice(
        inforPackage?.packages?.price,
        sumDiscount(inforPackage?.discount)
      ),
      isPaid: paypal?.isPaid || false,
      paidAt: paypal?.paidAt || undefined,
      timeStart: inforUser?.timeStart || new Date(Date.now()),
      timeEnd: new Date(
        handleTimeDate(
          inforUser?.timeStart || new Date(Date.now()),
          inforPackage?.packages?.duration
        )
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
    <div className={confirmInforRegister ? "" : "hidden"}>
      <div className="mt-3 flex gap-3">
        Payment with paypal
        <Switch
          className="bg-Primary"
          checked={paypal}
          onCheckedChange={() => setPaypal((a) => !a)}
        />
      </div>
      {paypal ? (
        <div className="relative">
          <div className="absolute z-10 h-[104px] top-0 right-0 left-0 bg-Dark font-light flex items-center text-Light">
            <i className="border border-Light p-1 text-sm opacity-80">
              By using <strong>Paypal</strong>, you can make your payments more
              easily. Click button to use payment with paypal.
            </i>
          </div>
          <div className="relative !z-0">
            <PayPalButton
              amount={totalPrice(
                inforPackage?.packages?.price,
                sumDiscount(inforPackage?.discount)
              )}
              onSuccess={(details, data) => {
                console.log("order Id: ", data, details);

                return handleRegisterTracking({
                  payerName: details?.payer?.name?.given_name,
                  payerEmail: details?.payer?.email_address,
                  payerId: details?.payer?.payer_id,
                  orderId: data?.orderID,
                  isPaid: true,
                  paidAt: details?.create_time,
                });
              }}
              onError={(error) => {
                toast.error("Error: ", error);
              }}
              options={{
                clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="border border-Light p-1 font-light text-sm opacity-80 mt-4 mb-3">
            <i className="">
              By clicking <strong>Register</strong>, you will register tracking
              with this information. You need to payment at Gymmax.
            </i>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <ButtonCustom className="w-full mt-4">Register</ButtonCustom>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle className="text-center">Card infor</DialogTitle>
                <DialogDescription className="text-center">
                  This is your package. Click <strong>confirm</strong> to
                  complete.
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
                <Button onClick={() => handleRegisterTracking()} type="submit">
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default PaymentRegister;
