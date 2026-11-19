"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type UserRole = "admin" | "student";
type LoginErrors = {
  email?: string;
  password?: string;
};
type Feedback = {
  kind: "error" | "info";
  message: string;
};

const DEMO_ADMIN_CREDENTIALS = {
  email: "admin@gmail.com",
  password: "admin321",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    const nextErrors: LoginErrors = {};
    if (!email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (role === "student") {
      setFeedback({
        kind: "info",
        message:
          "Student authentication will be connected to the backend later.",
      });
      return;
    }

    const isDemoAdmin =
      email.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.email &&
      password === DEMO_ADMIN_CREDENTIALS.password;

    if (isDemoAdmin) {
      router.push("/admin");
      return;
    }

    setFeedback({
      kind: "error",
      message: "The email address or password is incorrect.",
    });
  }

  function clearFeedback() {
    setFeedback(null);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-midnight px-4 py-8">
      <div className="mx-auto w-full max-w-[26rem]">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-midnight">
            <GraduationCap aria-hidden="true" size={20} strokeWidth={2} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            UniConnect
          </span>
        </div>

        <Card variant="elevated" className="border-0 p-6 sm:p-8">
          <header className="mb-6 text-center">
            <h1 className="text-3xl">Welcome Back</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Sign in to access your university portal.
            </p>
          </header>

          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            <Input
              autoComplete="email"
              error={errors.email}
              label="Email address"
              name="email"
              onChange={(event) => {
                setEmail(event.currentTarget.value);
                setErrors((current) => ({ ...current, email: undefined }));
                clearFeedback();
              }}
              placeholder="you@university.edu"
              required
              type="email"
              value={email}
            />

            <div className="relative">
              <Input
                autoComplete="current-password"
                className="pr-12"
                error={errors.password}
                label="Password"
                name="password"
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                  setErrors((current) => ({
                    ...current,
                    password: undefined,
                  }));
                  clearFeedback();
                }}
                placeholder="Enter your password"
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute bottom-2 right-3 flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" size={18} />
                ) : (
                  <Eye aria-hidden="true" size={18} />
                )}
              </button>
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-midnight"
                htmlFor="login-role"
              >
                Sign in as
              </label>
              <select
                className="uc-input"
                id="login-role"
                name="role"
                onChange={(event) => {
                  const selectedRole = event.currentTarget.value;
                  if (selectedRole === "admin" || selectedRole === "student") {
                    setRole(selectedRole);
                  }
                  clearFeedback();
                }}
                value={role}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-zinc-700">
                <input
                  checked={rememberMe}
                  className="h-4 w-4 accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  onChange={(event) => setRememberMe(event.currentTarget.checked)}
                  type="checkbox"
                />
                Remember me
              </label>
              <Link
                className="font-medium text-navy hover:underline"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            {feedback && (
              <div
                aria-live="polite"
                role={feedback.kind === "error" ? "alert" : "status"}
              >
                <Badge
                  className="whitespace-normal rounded-md px-3 py-2 text-left text-xs leading-5"
                  variant={feedback.kind === "error" ? "error" : "neutral"}
                >
                  {feedback.message}
                </Badge>
              </div>
            )}

            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>

          <div className="mt-5 rounded-md border border-border bg-light px-3 py-2.5 text-center text-xs leading-5 text-zinc-600">
            <p>
              Admin demo:{" "}
              <span className="font-medium text-navy">
                admin@gmail.com / admin321
              </span>
            </p>
            <p>For local demonstration only; not production authentication.</p>
          </div>

          <p className="mt-5 text-center text-sm text-zinc-600">
            New to UniConnect?{" "}
            <Link
              className="font-semibold text-navy hover:underline"
              href="/register"
            >
              Student registration
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
