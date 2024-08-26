export type typeDevice = {
  _id?: string;
  name: string;
  type: string;
  lastMaintenance?: Date;
  purchaseDate?: Date;
  maintenanceInterval?: number | undefined;
  description: string;
  image?: string;
  serialNumber: string | undefined;
  status?: string;
};
