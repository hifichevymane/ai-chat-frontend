import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { api } from "../fetch";
import { AUTH_TOKEN_KEY } from "../const";

const signUpValidationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(64, { message: "First name must be less than 64 characters" }),
  lastName: z.string().min(1, { message: "Last name is required" }).max(64, { message: "Last name must be less than 64 characters" }),
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }).max(255, { message: "Email must be less than 255 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(64, { message: "Password must be less than 64 characters" }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpValidationSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { firstName, lastName, email, password } = data;
      await api("/users", {
        method: "POST",
        body: { firstName, lastName, email, password },
      });

      const { token } = await api("/auth/login", {
        method: "POST",
        body: { email, password },
      });
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
            <input
              id="password"
              type="password"
              autoComplete="new-password"
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
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm" htmlFor="confirmPassword">
            Confirm Password
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="bg-primary-000 border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirmPassword-error"
              required
            />
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>
            )}
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