export type typeRegisterTracking = {
  package: {
    price: number | string;
    name: string;
    idPackage: string;
  };
  user: {
    fullName?: string;
    email: string;
    phone: string;
    idUser?: string;
  };
  discount?: {
    priceDescrease?: number | string | 0;
    idDiscount?: string[];
  };
  paymentMethod: string;
  totalPrice: number | string;
  isPaid: boolean;
  paidAt?: Date | undefined;
  timeStart: Date | string;
  timeEnd?: Date | string;
};

export type typePayment = {
  payerName?: String | undefined;
  payerEmail?: String | undefined;
  payerId?: String | undefined;
  orderId?: String | undefined;
  isPaid?: boolean | undefined;
  paidAt?: Date | undefined;
};
