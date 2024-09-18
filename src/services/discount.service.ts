import mainInstance from "@/axios/main.axios";
import noAuthInstance from "@/axios/no-auth.axios";
import { typeDiscount } from "@/types/discount.type";

export const DiscountApis = {
  getDetailsDiscount: async (id: string) => {
    try {
      const response = await noAuthInstance.get(`/discount/get-details/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllDiscounts: async () => {
    try {
      const response = await noAuthInstance.get(`/discount/get-all`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getActiveDiscount: async () => {
    try {
      const response = await noAuthInstance.get("/discount/get-active");
      return response;
    } catch (error) {
      return error;
    }
  },
  addDiscount: async (data: typeDiscount) => {
    try {
      const response = await mainInstance.post(`/discount/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  updateDiscount: async (id: string, data: typeDiscount) => {
    try {
      const response = await mainInstance.put(`/discount/update/${id}`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  changeStatusDiscount: async (id: string, status: string) => {
    try {
      const response = await mainInstance.put(
        `/discount/update-status/${id}/${status}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};
