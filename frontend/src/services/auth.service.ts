import type {
  LoginCredentials,
  LoginResponse,
} from "../types/auth.types";
import { apiClient } from "./api/client";

const AUTH_BASE_PATH = "/auth";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      `${AUTH_BASE_PATH}/login`,
      credentials,
    );

    return response.data;
  },
};
