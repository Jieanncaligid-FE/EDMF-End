"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type RegistrationValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  universityEmail: string;
  courseProgram: string;
  yearLevel: string;
  password: string;
  confirmPassword: string;
};

type RegistrationField = keyof RegistrationValues;
type RegistrationErrors = Partial<
  Record<RegistrationField | "terms", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: RegistrationValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  studentId: "",
  universityEmail: "",
  courseProgram: "",
  yearLevel: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const passwordRequirements = [
    { label: "At least 8 characters", met: values.password.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(values.password) },
    { label: "At least one lowercase letter", met: /[a-z]/.test(values.password) },
    { label: "At least one number", met: /[0-9]/.test(values.password) },
  ];
  const passwordIsStrong = passwordRequirements.every(
    (requirement) => requirement.met,
  );

  function updateField(field: RegistrationField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const nextErrors = { ...current, [field]: undefined };
      if (field === "password") {
        nextErrors.confirmPassword =
          values.confirmPassword && values.confirmPassword !== value
            ? "Passwords do not match."
            : undefined;
      }
      return nextErrors;
    });
    setSuccessMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");

    const nextErrors: RegistrationErrors = {};
    const requiredFields: Array<
      [Exclude<RegistrationField, "middleName" | "confirmPassword">, string]
    > = [
      ["firstName", "Enter your first name."],
      ["lastName", "Enter your last name."],
      ["studentId", "Enter your student ID."],
      ["courseProgram", "Enter your course or program."],
      ["yearLevel", "Select your year level."],
    ];

    requiredFields.forEach(([field, message]) => {
      if (!values[field].trim()) nextErrors[field] = message;
    });

    if (!values.universityEmail.trim()) {
      nextErrors.universityEmail = "Enter your university email address.";
    } else if (!EMAIL_PATTERN.test(values.universityEmail.trim())) {
      nextErrors.universityEmail = "Enter a valid email address.";
    }

    if (!values.password) {
      nextErrors.password = "Create a password.";
    } else if (!passwordIsStrong) {
      nextErrors.password = "Your password must meet every requirement below.";
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!acceptedTerms) {
      nextErrors.terms =
        "Accept the Terms and Conditions and Privacy Policy to continue.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSuccessMessage(
      "Your information passed frontend validation. Actual account creation will be connected to the backend later.",
    );
  }

  return (
    <main className="min-h-screen bg-midnight px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-midnight">
            <GraduationCap aria-hidden="true" size={20} strokeWidth={2} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            UniConnect
          </span>
        </div>

        <Card variant="elevated" className="border-0 p-6 sm:p-8">
          <header className="mb-7 text-center">
            <h1 className="text-3xl">Create your student account</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Enter your information to prepare your UniConnect registration.
            </p>
          </header>

          <form
            className="space-y-7"
            noValidate
            onSubmit={handleSubmit}
          >
            <section aria-labelledby="personal-information-heading">
              <h2
                className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy"
                id="personal-information-heading"
              >
                Personal Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Input
                  autoComplete="given-name"
                  error={errors.firstName}
                  label="First Name"
                  name="firstName"
                  onChange={(event) =>
                    updateField("firstName", event.currentTarget.value)
                  }
                  required
                  value={values.firstName}
                />
                <Input
                  autoComplete="additional-name"
                  label="Middle Name (optional)"
                  name="middleName"
                  onChange={(event) =>
                    updateField("middleName", event.currentTarget.value)
                  }
                  value={values.middleName}
                />
                <Input
                  autoComplete="family-name"
                  error={errors.lastName}
                  label="Last Name"
                  name="lastName"
                  onChange={(event) =>
                    updateField("lastName", event.currentTarget.value)
                  }
                  required
                  value={values.lastName}
                />
              </div>
            </section>

            <section aria-labelledby="student-information-heading">
              <h2
                className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy"
                id="student-information-heading"
              >
                Student Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  autoComplete="off"
                  error={errors.studentId}
                  label="Student ID"
                  name="studentId"
                  onChange={(event) =>
                    updateField("studentId", event.currentTarget.value)
                  }
                  required
                  value={values.studentId}
                />
                <Input
                  autoComplete="email"
                  error={errors.universityEmail}
                  label="University Email"
                  name="universityEmail"
                  onChange={(event) =>
                    updateField("universityEmail", event.currentTarget.value)
                  }
                  required
                  type="email"
                  value={values.universityEmail}
                />
                <Input
                  error={errors.courseProgram}
                  label="Course / Program"
                  name="courseProgram"
                  onChange={(event) =>
                    updateField("courseProgram", event.currentTarget.value)
                  }
                  required
                  value={values.courseProgram}
                />
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-midnight"
                    htmlFor="year-level"
                  >
                    Year Level
                    <span className="uc-field__required" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <select
                    aria-describedby={
                      errors.yearLevel ? "year-level-error" : undefined
                    }
                    aria-invalid={errors.yearLevel ? true : undefined}
                    className="uc-input"
                    id="year-level"
                    name="yearLevel"
                    onChange={(event) =>
                      updateField("yearLevel", event.currentTarget.value)
                    }
                    required
                    value={values.yearLevel}
                  >
                    <option value="">Select year level</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                  {errors.yearLevel && (
                    <p className="uc-field__error" id="year-level-error">
                      {errors.yearLevel}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section aria-labelledby="account-security-heading">
              <h2
                className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy"
                id="account-security-heading"
              >
                Account Security
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="relative">
                    <Input
                      autoComplete="new-password"
                      aria-describedby="password-requirements"
                      className="pr-12"
                      error={errors.password}
                      label="Password"
                      name="password"
                      onChange={(event) =>
                        updateField("password", event.currentTarget.value)
                      }
                      required
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                    />
                    <button
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-3 top-[2.4rem] flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      onClick={() =>
                        setShowPassword((visible) => !visible)
                      }
                      type="button"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" size={18} />
                      ) : (
                        <Eye aria-hidden="true" size={18} />
                      )}
                    </button>
                  </div>
                  <ul
                    aria-label="Password requirements"
                    aria-live="polite"
                    className="mt-3 grid gap-1.5 text-xs"
                    id="password-requirements"
                  >
                    {passwordRequirements.map((requirement) => (
                      <li
                        className={`flex items-center gap-2 ${
                          requirement.met ? "text-emerald-700" : "text-zinc-500"
                        }`}
                        data-satisfied={requirement.met}
                        key={requirement.label}
                      >
                        <Check
                          aria-hidden="true"
                          className={
                            requirement.met ? "opacity-100" : "opacity-30"
                          }
                          size={14}
                          strokeWidth={2.5}
                        />
                        {requirement.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative">
                  <Input
                    autoComplete="new-password"
                    className="pr-12"
                    error={errors.confirmPassword}
                    label="Confirm Password"
                    name="confirmPassword"
                    onChange={(event) => {
                      const value = event.currentTarget.value;
                      updateField("confirmPassword", value);
                      if (value && value !== values.password) {
                        setErrors((current) => ({
                          ...current,
                          confirmPassword: "Passwords do not match.",
                        }));
                      }
                    }}
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                  />
                  <button
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    className="absolute right-3 top-[2.4rem] flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    onClick={() =>
                      setShowConfirmPassword((visible) => !visible)
                    }
                    type="button"
                  >
                    {showConfirmPassword ? (
                      <EyeOff aria-hidden="true" size={18} />
                    ) : (
                      <Eye aria-hidden="true" size={18} />
                    )}
                  </button>
                </div>
              </div>
            </section>

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
                <input
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                  aria-invalid={errors.terms ? true : undefined}
                  checked={acceptedTerms}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  onChange={(event) => {
                    setAcceptedTerms(event.currentTarget.checked);
                    setErrors((current) => ({ ...current, terms: undefined }));
                    setSuccessMessage("");
                  }}
                  required
                  type="checkbox"
                />
                <span>
                  I agree to the{" "}
                  <strong className="font-semibold text-midnight">
                    Terms and Conditions
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold text-midnight">
                    Privacy Policy
                  </strong>
                  .
                </span>
              </label>
              {errors.terms && (
                <p className="uc-field__error mt-2" id="terms-error">
                  {errors.terms}
                </p>
              )}
            </div>

            {successMessage && (
              <div
                aria-live="polite"
                className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900"
                role="status"
              >
                {successMessage}
              </div>
            )}

            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link
              className="font-semibold text-navy hover:underline"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
