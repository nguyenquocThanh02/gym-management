import mainInstance from "@/axios/main.axios";
import noAuthInstance from "@/axios/no-auth.axios";
import { typePT } from "@/types/pt.type";

export const PTApis = {
  getDetailsUser: async (ptId: string) => {
    try {
      const response = await noAuthInstance.get(
        `/personal-trainer/get-details/${ptId}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllPT: async () => {
    try {
      const response = await noAuthInstance.get("/personal-trainer/get-all");
      return response;
    } catch (error) {
      return error;
    }
  },
  addPT: async (data: typePT) => {
    try {
      const response = await mainInstance.post("/personal-trainer/add", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  updatePT: async (data: typePT, ptId: string) => {
    try {
      const response = await mainInstance.post(
        `/personal-trainer/update/${ptId}`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  changeStatusPT: async (ptId: string, status: string) => {
    try {
      const response = await mainInstance.put(
        `/personal-trainer/change-status/${ptId}/${status}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};
