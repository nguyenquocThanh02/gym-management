export type typeRefresh = {
  refreshToken: string;
};

export type typeRegister = {
  fullName: string | "";
  email: string;
  phone: string;
  password: string;
  accountName: string;
  dateOfBirth: string | "";
  inviteToken: string | undefined;
};

export type typeLogin = {
  account: string;
  password: string;
};

export type typeCreatePassword = {
  password: string;
  resetToken: string;
};
