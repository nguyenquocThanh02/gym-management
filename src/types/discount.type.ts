export type typeDiscount = {
  _id?: string;
  name: string;
  percent: number | string;
  description?: string;
  status?: "active" | "stop";
  validFrom: Date;
  validTo: Date;
  packages: [];
};
