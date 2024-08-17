import instance from "@/axios/auth.axios";
import { typeRefresh, typeRegister } from "@/types/auth.type";

export const AuthenApis = {
  register: async (data: typeRegister) => {
    try {
      console.log("day: ", data);
      const response = await instance.post("/user/register", data);
      console.log("responde: ", response);
      return response;
    } catch (error) {
      console.log("error2: ", error);
      return error;
    }
  },
  login: async (data) => {
    try {
      console.log("day: ", data);
      const response = await instance.post("/user/login", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  handleRefreshToken: async (data: typeRefresh) => {
    try {
      const response = await instance.post("/refreshToken", data);
      return response;
    } catch (error) {
      return error;
    }
  },
};
