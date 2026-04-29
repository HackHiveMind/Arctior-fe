import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  type CredentialsPayload,
  type RegisterPayload,
  type PublicUser,
  getAuthenticatedUser,
  getSetupStatus,
  loginAuth,
  registerAuth,
  setupAuth,
} from '../api/api';

interface AdminContextValue {
  needsSetup: boolean | null;
  token: string | null;
  user: PublicUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setupAdmin: (credentials: CredentialsPayload) => Promise<void>;
  registerAdmin: (credentials: RegisterPayload) => Promise<void>;
  login: (credentials: CredentialsPayload) => Promise<void>;
  logout: () => void;
}

const AUTH_TOKEN_KEY = 'arctior.auth.token';
const AdminContext = createContext<AdminContextValue | undefined>(undefined);

function readStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

function persistToken(token: string): void {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearStoredToken(): void {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export const AdminProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(readStoredToken);
  const [user, setUser] = useState<PublicUser | null>(null);
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        const setupStatus = await getSetupStatus();
        if (!isMounted) {
          return;
        }

        setNeedsSetup(setupStatus.needsSetup);

        const storedToken = readStoredToken();
        if (!storedToken) {
          setToken(null);
          setUser(null);
          return;
        }

        try {
          const response = await getAuthenticatedUser(storedToken);
          if (!isMounted) {
            return;
          }

          setToken(storedToken);
          setUser(response.user);
        } catch {
          if (!isMounted) {
            return;
          }

          clearStoredToken();
          setToken(null);
          setUser(null);
        }
      } catch {
        if (isMounted) {
          setNeedsSetup(false);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    void initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      needsSetup,
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isInitializing,
      setupAdmin: async (credentials: CredentialsPayload) => {
        const response = await setupAuth(credentials);
        persistToken(response.token);
        setToken(response.token);
        setUser(response.user);
        setNeedsSetup(false);
      },
      registerAdmin: async (credentials: RegisterPayload) => {
        const response = await registerAuth(credentials);
        persistToken(response.token);
        setToken(response.token);
        setUser(response.user);
        setNeedsSetup(false);
      },
      login: async (credentials: CredentialsPayload) => {
        const response = await loginAuth(credentials);
        persistToken(response.token);
        setToken(response.token);
        setUser(response.user);
      },
      logout: () => {
        clearStoredToken();
        setToken(null);
        setUser(null);
      },
    }),
    [isInitializing, needsSetup, token, user],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }

  return context;
};
