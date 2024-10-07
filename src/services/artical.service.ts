import mainInstance from "@/axios/main.axios";
import noAuthInstance from "@/axios/no-auth.axios";
import { typeArtical } from "@/types";

export const ArticalApis = {
  addArtical: async (data: typeArtical) => {
    try {
      const response = await mainInstance.post("/artical/add", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllArticals: async (status: string) => {
    try {
      const response = await noAuthInstance.get(`/artical/get-all/${status}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getArticalsOfUser: async (id: string, status: string) => {
    try {
      const response = await mainInstance.get(
        `/artical/get-of-user/${id}/${status}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  getNewArticals: async () => {
    try {
      const response = await noAuthInstance.get(`/artical/get-new`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getDetailsArtical: async (id: string) => {
    try {
      const response = await noAuthInstance.get(`/artical/get-details/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteArtical: async (id: string) => {
    try {
      const response = await mainInstance.delete(`/artical/delete/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  changeStatusArtical: async (id: string, status: string) => {
    try {
      const response = await mainInstance.put(
        `/artical/change-status/${id}/${status}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};
