import { AUTH_TOKEN_KEY } from "../const";
import { redirect } from "@tanstack/react-router";

export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export const redirectToLoginIfNotAuthenticated = () => {
  if (isAuthenticated()) return;
  throw redirect({ to: "/login" });
};

export const redirectToHomeIfAuthenticated = () => {
  if (!isAuthenticated()) return;
  throw redirect({ to: "/" });
};
