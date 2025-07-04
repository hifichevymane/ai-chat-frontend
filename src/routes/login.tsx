import LoginPage from "../pages/Login";
import { createFileRoute } from "@tanstack/react-router";
import { redirectToHomeIfAuthenticated } from "../utils/auth";

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: redirectToHomeIfAuthenticated,
})
