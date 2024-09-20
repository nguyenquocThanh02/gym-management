import mainInstance from "@/axios/main.axios";
import noAuthInstance from "@/axios/no-auth.axios";
import { typeRegisterTracking } from "@/types";

export const RegisterTrackingApis = {
  addRegisterTracking: async (data: typeRegisterTracking) => {
    try {
      const response = await mainInstance.post(`/register-tracking/add`, data);
      return response;
    } catch (e) {
      return e;
    }
  },
  getAllRegisterTrackings: async () => {
    try {
      const response = await mainInstance.get("/register-tracking/get-all");
      return response;
    } catch (e) {
      return e;
    }
  },
  getAllRegisterTrackingsOfUser: async (idUser: string) => {
    try {
      const response = await mainInstance.get(
        `/register-tracking/get-all-of-user/${idUser}`
      );
      return response;
    } catch (e) {
      return e;
    }
  },
};
