import { createContext } from "react";
import User from "./interfaces/User";

export interface AuthContextState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextState | null>(null);
