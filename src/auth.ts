import { createContext, useContext } from "react";
import User from "./interfaces/User";

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
