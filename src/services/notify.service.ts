import mainInstance from "@/axios/main.axios";
import noAuthInstance from "@/axios/no-auth.axios";
import { typeAddNotify } from "@/types/notify.type";

export const NotifyApis = {
  addDiscount: async (data: typeAddNotify) => {
    try {
      const response = await noAuthInstance.post(`/notify/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
};
