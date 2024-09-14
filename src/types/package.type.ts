export type typePackage = {
  _id?: string;
  name: string;
  type?: string;
  sessionWithPT?: number | string;
  description?: string;
  suitableFor?: string;
  price: number | string;
  duration: number | string;
  discount?: string;
  stock?: number | string;
  register?: number | string;
  status?: "active" | "block";
  createdAt?: Date;
  updatedAt?: Date;
};
