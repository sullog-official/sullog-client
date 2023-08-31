import { createContext } from 'react';

export type AuthState = {
  accessToken: string | null;
  login: (newAccessToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);
