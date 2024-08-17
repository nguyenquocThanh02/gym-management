import instance from "@/axios/main.axios";

export const UserApis = {
  getDetailsUser: async (userId: string) => {
    try {
      const response = await instance.get(`/user/get-details/${userId}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};
