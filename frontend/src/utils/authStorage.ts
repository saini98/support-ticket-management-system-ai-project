import type { AuthUser, StoredAuthSession } from "../types/auth.types";

const ACCESS_TOKEN_KEY = "sts.accessToken";
const AUTH_USER_KEY = "sts.authUser";

const getSessionStorage = (): Storage | null => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export const getAccessToken = (): string | null => {
  const storage = getSessionStorage();
  return storage?.getItem(ACCESS_TOKEN_KEY) ?? null;
};

export const getStoredUser = (): AuthUser | null => {
  const storage = getSessionStorage();
  const rawUser = storage?.getItem(AUTH_USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
};

export const saveAuthSession = (session: StoredAuthSession): void => {
  const storage = getSessionStorage();

  if (!storage) {
    return;
  }

  storage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  storage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
};

export const clearAuthSession = (): void => {
  const storage = getSessionStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(AUTH_USER_KEY);
};

export const hasAuthSession = (): boolean => {
  return Boolean(getAccessToken() && getStoredUser());
};
