import axios, { type AxiosError, type AxiosInstance } from "axios";

import { ApiError, type ApiErrorResponse } from "../../types/api.types";
import { notifyUnauthorized } from "../../utils/authEvents";
import { clearAuthSession, getAccessToken } from "../../utils/authStorage";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:3000";

const AUTH_ERROR_CODES = new Set([
  "AUTHENTICATION_REQUIRED",
  "INVALID_TOKEN",
  "TOKEN_EXPIRED",
]);

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 15000,
  });

  client.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      const statusCode = error.response?.status;
      const errorCode = error.response?.data?.code;
      const requestUrl = error.config?.url ?? "";
      const isLoginRequest = requestUrl.includes("/auth/login");

      if (
        statusCode === 401 &&
        !isLoginRequest &&
        (errorCode ? AUTH_ERROR_CODES.has(errorCode) : true)
      ) {
        clearAuthSession();
        notifyUnauthorized();
      }

      if (error.response?.data?.message) {
        const { message, code, details } = error.response.data;

        return Promise.reject(
          new ApiError(statusCode ?? 0, message, code, details),
        );
      }

      if (error.request) {
        return Promise.reject(
          new ApiError(0, "Unable to reach the server. Please try again."),
        );
      }

      return Promise.reject(
        new ApiError(0, error.message || "An unexpected error occurred"),
      );
    },
  );

  return client;
};

export const apiClient = createApiClient();

export { API_BASE_URL };
