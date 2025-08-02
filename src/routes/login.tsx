import LoginPage from "../pages/Login";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) return;
    if (context.auth.accessToken) {
      throw redirect({ to: "/" });
    }
  },
});
