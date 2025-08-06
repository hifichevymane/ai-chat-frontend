import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { api } from "../fetch";
import { useAuth } from "../hooks";

const signUpValidationSchema = z.object({
  firstName: z.string("First name is required").max(64, { error: "First name must be less than 64 characters" }),
  lastName: z.string("Last name is required").max(64, { error: "Last name must be less than 64 characters" }),
  email: z.email({ error: "Invalid email address" }).max(255, { error: "Email must be less than 255 characters" }),
  password: z.string("Password is required").min(8, { error: "Password must be at least 8 characters" }).max(64, { error: "Password must be less than 64 characters" }),
  confirmPassword: z.string("Please confirm your password").min(8, { error: "Please confirm your password" }),
  rememberMe: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpValidationSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setAccessToken, setShouldLogoutOnBeforeUnload } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpValidationSchema),
    mode: "onChange",
    defaultValues: {
      rememberMe: true,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { firstName, lastName, email, password, confirmPassword, rememberMe } = data;
      const { data: { accessToken } } = await api.post<{ accessToken: string }>("/auth/sign-up", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });
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
        aria-label="Sign up form"
        noValidate
      >
        <header className="mb-2">
          <h1 className="text-2xl font-bold font-secondary text-primary-600 mb-1">Sign Up</h1>
          <p className="text-primary-500 font-secondary text-base">Create your account</p>
        </header>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm" htmlFor="firstName">
            First Name
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              className="bg-primary-000 border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby="firstName-error"
              required
            />
            {errors.firstName && (
              <span id="firstName-error" className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>
            )}
          </label>
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm" htmlFor="lastName">
            Last Name
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              className="bg-primary-000 border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby="lastName-error"
              required
            />
            {errors.lastName && (
              <span id="lastName-error" className="text-red-500 text-xs mt-1">{errors.lastName.message}</span>
            )}
          </label>
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
                autoComplete="new-password"
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
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm" htmlFor="confirmPassword">
            Confirm Password
            <div className="relative bg-primary-000 border border-primary-200 rounded-lg">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="w-full h-full border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
                required
                maxLength={45}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="bg-primary-000 z-10 absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 text-xs focus:outline-none"
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {
                  showConfirmPassword
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
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
        <div className="text-center mt-2">
          <span className="text-primary-500 font-secondary text-sm">Already have an account? </span>
          <Link
            to="/login"
            className="text-primary-600 hover:underline font-secondary text-sm font-semibold transition-colors"
          >
            Log in
          </Link>
        </div>
      </form>
    </main>
  );
}