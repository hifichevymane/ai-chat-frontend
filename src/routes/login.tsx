import LoginPage from "../pages/Login";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: ({ context: { auth } }) => {
    if (!auth.isPending && auth.accessToken) {
      throw redirect({ to: "/" });
    }
  },
});
