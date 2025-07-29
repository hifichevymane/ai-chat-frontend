import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "@tanstack/react-router";

import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";

const loginValidationSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(64, { message: "Password must be less than 64 characters" }),
});

type LoginFormValues = z.infer<typeof loginValidationSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { data: { token } } = await api.post<{ token: string }>("/auth/login", data);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      navigate({ to: "/" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-primary-000">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-100 rounded-2xl shadow-md px-8 py-10 w-full max-w-sm flex flex-col gap-6"
        aria-label="Login form"
        noValidate
      >
        <header className="mb-2">
          <h1 className="text-2xl font-bold font-secondary text-primary-600 mb-1">Log in</h1>
          <p className="text-primary-500 font-secondary text-base">to continue to AI Chat</p>
        </header>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm" htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="bg-primary-000 border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              required
            />
            {errors.email && (
              <span id="email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</span>
            )}
          </label>
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm" htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="bg-primary-000 border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
              {...register("password")}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              required
            />
            {errors.password && (
              <span id="password-error" className="text-red-500 text-xs mt-1">{errors.password.message}</span>
            )}
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`mt-2 w-full h-12 rounded-lg font-primary text-base font-semibold transition-colors duration-150 bg-primary-600 text-primary-000 hover:bg-primary-500 disabled:bg-primary-300 disabled:text-primary-400 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
        <div className="text-center mt-2">
          <span className="text-primary-500 font-secondary text-sm">Don't have an account? </span>
          <Link
            to="/sign-up"
            className="text-primary-600 hover:underline font-secondary text-sm font-semibold transition-colors"
          >
            Sign up
          </Link>
        </div>
      </form>
    </main>
  );
}