import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "../hooks";

import { api } from "../fetch";

const loginValidationSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(45, { message: "Password must be less than 45 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginValidationSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAccessToken, setShouldLogoutOnBeforeUnload } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    mode: "onChange",
    defaultValues: {
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { rememberMe, ...otherData } = data;
      const { data: { accessToken } } = await api.post<{ accessToken: string }>("/auth/login", otherData);
      setAccessToken(accessToken);
      setShouldLogoutOnBeforeUnload(!rememberMe);

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
            <div className="relative bg-primary-000 border border-primary-200 rounded-lg">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full h-full border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
                {...register("password")}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                required
                maxLength={45}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="bg-primary-000 z-10 absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 text-xs focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {
                  showPassword
                    ? (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <g fill="none">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 3l18 18"></path>
                        <path fill="currentColor" fillRule="evenodd" d="M5.4 6.23c-.44.33-.843.678-1.21 1.032a15.1 15.1 0 0 0-3.001 4.11a1.44 1.44 0 0 0 0 1.255a15.1 15.1 0 0 0 3 4.111C5.94 18.423 8.518 20 12 20c2.236 0 4.1-.65 5.61-1.562l-3.944-3.943a3 3 0 0 1-4.161-4.161L5.401 6.229zm15.266 9.608a15 15 0 0 0 2.145-3.21a1.44 1.44 0 0 0 0-1.255a15.1 15.1 0 0 0-3-4.111C18.06 5.577 15.483 4 12 4a10.8 10.8 0 0 0-2.808.363z" clipRule="evenodd"></path>
                      </g>
                    </svg>)
                    : (
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                        <g fill="currentColor">
                          <path d="M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
                          <path fillRule="evenodd" d="M12 3C6.408 3 1.71 6.824.378 12C1.71 17.176 6.408 21 12 21s10.29-3.824 11.622-9C22.29 6.824 17.592 3 12 3m4 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0" clipRule="evenodd"></path>
                        </g>
                      </svg>
                    )
                }
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="text-red-500 text-xs mt-1">{errors.password.message}</span>
            )}
          </label>
          <label className="inline-flex items-center gap-2 font-secondary text-primary-500 text-sm" htmlFor="rememberMe">
            <input
              id="rememberMe"
              type="checkbox"
              className="accent-primary-600"
              {...register("rememberMe")}
            />
            Remember me
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