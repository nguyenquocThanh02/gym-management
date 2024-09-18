import mainInstance from "@/axios/main.axios";
import noAuthInstance from "@/axios/no-auth.axios";
import { typePackage } from "@/types";

export const PackageApis = {
  getDetailsPackage: async (id: string) => {
    try {
      const response = await noAuthInstance.get(`/package/get-details/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllPackage: async () => {
    try {
      const response = await noAuthInstance.get("/package/get-all");
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllPackageName: async () => {
    try {
      const response = await noAuthInstance.get("/package/get-all-name");
      return response;
    } catch (error) {
      return error;
    }
  },
  getPopularPackage: async () => {
    try {
      const response = await noAuthInstance.get("/package/get-popular");
      return response;
    } catch (error) {
      return error;
    }
  },
  addPackage: async (data: typePackage) => {
    try {
      const response = await mainInstance.post("/package/add", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  updatePackage: async (data: typePackage, id: string) => {
    try {
      const response = await mainInstance.put(`/package/update/${id}`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  changeStatusPackage: async (id: string, status: string) => {
    try {
      const response = await mainInstance.put(
        `/package/update-status/${id}/${status}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};
