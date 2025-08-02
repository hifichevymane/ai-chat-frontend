import { createContext } from "react";

export interface AuthContextState {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  isPending: boolean;
}

export const AuthContext = createContext<AuthContextState | null>(null);
