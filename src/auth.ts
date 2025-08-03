import { createContext } from "react";

export interface AuthContextState {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  isPending: boolean;
  setShouldLogoutOnBeforeUnload: (shouldLogoutOnBeforeUnload: boolean) => void;
}

export const AuthContext = createContext<AuthContextState | null>(null);
