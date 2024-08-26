import mainInstance from "@/axios/main.axios";
import noAuthInstance from "@/axios/no-auth.axios";
import { typeDevice } from "@/types";

export const DeviceApis = {
  getDetailsDevice: async (id: string) => {
    try {
      const response = await noAuthInstance.get(`/device/get-details/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllDevice: async () => {
    try {
      const response = await noAuthInstance.get("/device/get-all");
      return response;
    } catch (error) {
      return error;
    }
  },
  addDevice: async (data: typeDevice) => {
    try {
      const response = await mainInstance.post("/device/add", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  updateDevice: async (data: typeDevice, id: string) => {
    try {
      const response = await mainInstance.post(`/device/update/${id}`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  changeStatusDevice: async (id: string, status: string) => {
    try {
      const response = await mainInstance.put(
        `/device/update-status/${id}/${status}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};
