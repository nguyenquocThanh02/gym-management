import noAuthInstance from "@/axios/no-auth.axios";
import {
  typeCreatePassword,
  typeLogin,
  typeRefresh,
  typeRegister,
} from "@/types/auth.type";

export const AuthenApis = {
  register: async (data: typeRegister) => {
    try {
      console.log("day: ", data);
      const response = await noAuthInstance.post("/user/register", data);
      console.log("responde: ", response);
      return response;
    } catch (error) {
      console.log("error2: ", error);
      return error;
    }
  },
  login: async (data: typeLogin, role: string = "user") => {
    try {
      console.log("day: ", data);
      const response = await noAuthInstance.post(`/user/login/${role}`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  handleRefreshToken: async (data: typeRefresh) => {
    try {
      const response = await noAuthInstance.post("/refreshToken", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  resetPassword: async (email: string) => {
    try {
      const response = await noAuthInstance.post(`/user/reset/${email}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  createPassword: async (data: typeCreatePassword) => {
    try {
      const response = await noAuthInstance.post(`/user/create-password`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
};
