import { AUTH_TOKEN_KEY } from "../const";
import { redirect } from "@tanstack/react-router";
import { api } from "../fetch";

export const isAuthenticated = async () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return false;
  try {
    const { valid } = await api('/auth/verify', {
      method: 'POST',
      body: {
        token,
      },
    });
    return valid;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const redirectToLoginIfNotAuthenticated = async () => {
  const authenticated = await isAuthenticated();
  if (authenticated) return;
  throw redirect({ to: "/login" });
};

export const redirectToHomeIfAuthenticated = async () => {
  const authenticated = await isAuthenticated();
  if (!authenticated) return;
  throw redirect({ to: "/" });
};
