import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { getUserData } from "../hooks/user.actions";

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  updated: Date;
  created: Date;
  avatar: string;
  posts_count: number;
  comments_count: number;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

/**
 * Create an instance of axios with default configurations.
 */
const axiosService = axios.create({
  baseURL: "https://til-api.eastus.cloudapp.azure.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors to handle request and response
axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

axiosService.interceptors.request.use((config) => {
  // Add authorization token to headers
  const { access } = getUserData();

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

/**
 * Axios instance used for making API requests with authorization headers.
 */
export default axiosService;

/**
 * Axios interceptor to refresh access token when it expires.
 * @param failedRequest Axios error object from the failed request
 */
const refreshAuthLogic = async (failedRequest: AxiosError) => {
  const { refresh, user } = getUserData();
  return axios
    .post(
      "/auth/refresh/",
      { refresh },
      {
        baseURL: "https://til-api.eastus.cloudapp.azure.com/api",
      }
    )
    .then((res) => {
      const { access } = res.data;
      if (failedRequest.response) {
        failedRequest.response.config.headers[
          "Authorization"
        ] = `Bearer ${access}`;
      }
      localStorage.setItem("auth", JSON.stringify({ access, refresh, user }));
    })
    .catch(() => {
      localStorage.removeItem("auth");
    });
};

// Attach the interceptor to axiosService instance
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

/**
 * A helper function to fetch data from the API.
 * To use it with SWR
 */
export function fetcher(url: string) {
  return axiosService.get(url).then((res) => res.data);
}
