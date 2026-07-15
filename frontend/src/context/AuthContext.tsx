import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "../services/auth.service";
import type { AuthUser, LoginCredentials } from "../types/auth.types";
import { ApiError } from "../types/api.types";
import { notifyUnauthorized, setUnauthorizedHandler } from "../utils/authEvents";
import {
  clearAuthSession,
  getAccessToken,
  getStoredUser,
  saveAuthSession,
} from "../utils/authStorage";
import { ROUTES } from "../routes/paths";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessToken(),
  );

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
    setAccessToken(null);
    navigate(ROUTES.LOGIN, { replace: true });
  }, [navigate]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearAuthSession();
      setUser(null);
      setAccessToken(null);
      navigate(ROUTES.LOGIN, { replace: true });
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [navigate]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);

    saveAuthSession({
      accessToken: response.accessToken,
      user: response.user,
    });

    setAccessToken(response.accessToken);
    setUser(response.user);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(accessToken && user),
      login,
      logout,
    }),
    [accessToken, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function getLoginErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  return "Unable to sign in. Please try again.";
}

export { notifyUnauthorized };
