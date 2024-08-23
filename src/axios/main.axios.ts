import { localStorageKey } from "@/constants/localStorage";
import { AuthenApis } from "@/services/auth.service";
import { typeRefresh } from "@/types/auth.type";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  transformResponse: [
    function (data) {
      return data;
    },
  ],
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(localStorageKey.accessToken);
    if (token) {
      config.headers["token"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      // config.headers["ngrok-skip-browser-warning"] = "true";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshAttempts = 0;

instance.interceptors.response.use(
  (response) => {
    if (response.data) {
      return JSON.parse(response.data);
    }
    return response;
  },
  async (error) => {
    console.log(">>>>");
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken =
          localStorage.getItem(localStorageKey.refreshToken) || "";
        if (refreshToken && refreshAttempts <= 2) {
          const originalRequest = error.config;

          const dataRequest: typeRefresh = {
            refreshToken: refreshToken,
          };
          const result = await AuthenApis.handleRefreshToken(dataRequest);
          if (result?.access_token) {
            localStorage.setItem(
              localStorageKey.accessToken,
              result?.access_token
            );
          }
          originalRequest.headers["token"] = `Bearer ${localStorage.getItem(
            localStorageKey.accessToken
          )}`;

          refreshAttempts++;
          return instance(originalRequest);
        } else {
          return;
        }
      } catch (err) {
        localStorage.removeItem(localStorageKey.accessToken);
        localStorage.removeItem(localStorageKey.refreshToken);
        localStorage.removeItem(localStorageKey.userId);
      }
    } else {
      if (error?.response?.data) {
        console.log("5: ", JSON.parse(error.response.data));
        return JSON.parse(error.response.data);
      }
      return error.response.data;
    }
    return Promise.reject(error.response);
  }
);

export default instance;
