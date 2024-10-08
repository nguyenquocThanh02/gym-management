export type typeAccount = {
  _id?: string;
  fullName?: string;
  accountName?: string;
  email: string;
  role?: "admin" | "user" | "trainee";
  phone?: number | string;
  dateOfBirth?: string;
  avatar?: string;
  status?: "active" | "block";
  createdAt?: string;
};

export type typeInforUser = {
  _id?: string;
  fullName?: string;
  email: string;
  phone?: string;
  timeStart?: Date | string;
};

export type typeChangePassword = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
