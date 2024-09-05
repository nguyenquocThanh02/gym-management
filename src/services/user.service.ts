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
  getAllRoleTrainee: async () => {
    try {
      const response = await instance.get("/user/get-all-trainee");
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllRoleUser: async () => {
    try {
      const response = await instance.get("/user/get-all-user");
      return response;
    } catch (error) {
      return error;
    }
  },
  changeStatus: async (id: string, status: string) => {
    try {
      const response = await instance.put(
        `/user/change-status/${id}/${status}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  changeRole: async (id: string, role: string) => {
    try {
      const response = await instance.put(`/user/change-role/${id}/${role}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  inviteAccount: async (email: string) => {
    try {
      const response = await instance.post(`/user/invite-account/${email}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};
