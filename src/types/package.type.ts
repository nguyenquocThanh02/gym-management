import { typeDiscount } from "./discount.type";

export type typePackage = {
  _id?: string;
  name: string;
  type?: string;
  sessionWithPT?: number | string;
  description?: string;
  suitableFor?: string;
  price: number | string;
  duration: number | string;
  stock?: number | string;
  register?: number | string;
  status?: "active" | "block";
  createdAt?: Date;
  updatedAt?: Date;
};

export type typeResponsePackage = {
  packages: typePackage;
  discount?: typeDiscount;
};

export type typePackageName = {
  id: string;
  name: string;
};
