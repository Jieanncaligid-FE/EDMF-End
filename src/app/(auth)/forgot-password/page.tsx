"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type FormStage = "form" | "submitting" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_MESSAGE =
  "Your password reset request has been submitted successfully. The actual email verification and password reset process will be available once the backend is connected.";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [stage, setStage] = useState<FormStage>("form");

  useEffect(() => {
    if (stage !== "submitting") return;

    const timeoutId = window.setTimeout(() => setStage("success"), 600);
    return () => window.clearTimeout(timeoutId);
  }, [stage]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (stage === "submitting") return;

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setEmailError("Enter your university email address.");
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setEmailError("");
    setStage("submitting");
  }

  function tryAgain() {
    setEmailError("");
    setStage("form");
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
          {stage === "success" ? (
            <section aria-labelledby="request-submitted-heading">
              <header className="mb-6 text-center">
                <h1 className="text-3xl" id="request-submitted-heading">
                  Request Submitted
                </h1>
                <p
                  aria-live="polite"
                  className="mt-3 text-sm leading-6 text-zinc-600"
                  role="status"
                >
                  {SUCCESS_MESSAGE}
                </p>
              </header>
              <div className="space-y-3">
                <Link
                  className="uc-button uc-button--primary w-full"
                  href="/login"
                >
                  Back to Login
                </Link>
                <Button
                  className="w-full"
                  onClick={tryAgain}
                  type="button"
                  variant="outline"
                >
                  Try another email
                </Button>
              </div>
            </section>
          ) : (
            <>
              <header className="mb-6 text-center">
                <h1 className="text-3xl">Forgot Password?</h1>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {
                    "Don't worry! Enter your university email address and we'll help you reset your password."
                  }
                </p>
              </header>

              <form
                aria-busy={stage === "submitting"}
                className="space-y-5"
                noValidate
                onSubmit={handleSubmit}
              >
                <Input
                  autoComplete="email"
                  disabled={stage === "submitting"}
                  error={emailError || undefined}
                  label="University Email"
                  name="email"
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                    setEmailError("");
                  }}
                  placeholder="you@university.edu"
                  required
                  type="email"
                  value={email}
                />
                <Button
                  aria-busy={stage === "submitting"}
                  className="w-full"
                  disabled={stage === "submitting"}
                  type="submit"
                >
                  {stage === "submitting" ? "Submitting..." : "Send Reset Link"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm">
                <Link
                  className="font-semibold text-navy hover:underline"
                  href="/login"
                >
                  Back to Login
                </Link>
              </p>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
