"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Bell, Check, LockKeyhole, ShieldCheck, Sun } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type GeneralSettings = {
  universityName: string;
  systemName: string;
  universityEmail: string;
  academicYear: string;
  currentSemester: string;
};

type AccountSettings = {
  administratorName: string;
  administratorEmail: string;
};

type PasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type NotificationPreferences = {
  enrollment: boolean;
  academic: boolean;
  library: boolean;
  integration: boolean;
};

const initialGeneralSettings: GeneralSettings = {
  universityName: "UniConnect Demonstration University",
  systemName: "UniConnect",
  universityEmail: "admin@uniconnect.example",
  academicYear: "2026-2027",
  currentSemester: "First Semester",
};

const initialAccountSettings: AccountSettings = {
  administratorName: "Alex Morgan",
  administratorEmail: "admin@uniconnect.example",
};

const initialPasswordValues: PasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const passwordRequirementLabels = [
  {
    label: "At least 8 characters",
    test: (password: string) => password.length >= 8,
  },
  {
    label: "At least one uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "At least one lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "At least one number",
    test: (password: string) => /[0-9]/.test(password),
  },
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminSettingsPage() {
  const [general, setGeneral] = useState(initialGeneralSettings);
  const [generalErrors, setGeneralErrors] = useState<
    Partial<Record<keyof GeneralSettings, string>>
  >({});
  const [generalFeedback, setGeneralFeedback] = useState("");

  const [account, setAccount] = useState(initialAccountSettings);
  const [accountErrors, setAccountErrors] = useState<
    Partial<Record<keyof AccountSettings, string>>
  >({});
  const [accountFeedback, setAccountFeedback] = useState("");

  const [passwords, setPasswords] = useState(initialPasswordValues);
  const [passwordErrors, setPasswordErrors] = useState<
    Partial<Record<keyof PasswordValues, string>>
  >({});
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const [notifications, setNotifications] =
    useState<NotificationPreferences>({
      enrollment: true,
      academic: true,
      library: false,
      integration: true,
    });
  const [notificationFeedback, setNotificationFeedback] = useState("");

  function updateGeneral(field: keyof GeneralSettings, value: string) {
    setGeneral((current) => ({ ...current, [field]: value }));
    setGeneralErrors((current) => ({ ...current, [field]: undefined }));
    setGeneralFeedback("");
  }

  function saveGeneral(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: Partial<Record<keyof GeneralSettings, string>> = {};
    for (const [field, value] of Object.entries(general) as [
      keyof GeneralSettings,
      string,
    ][]) {
      if (!value.trim()) errors[field] = "This field is required.";
    }
    if (
      general.universityEmail.trim() &&
      !emailPattern.test(general.universityEmail.trim())
    ) {
      errors.universityEmail = "Enter a valid university email address.";
    }
    setGeneralErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setGeneralFeedback(
      "General settings were updated in this page's frontend state only; they are not saved permanently.",
    );
  }

  function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: Partial<Record<keyof AccountSettings, string>> = {};
    if (!account.administratorName.trim()) {
      errors.administratorName = "Enter the administrator name.";
    }
    if (!account.administratorEmail.trim()) {
      errors.administratorEmail = "Enter the administrator email.";
    } else if (!emailPattern.test(account.administratorEmail.trim())) {
      errors.administratorEmail = "Enter a valid email address.";
    }
    setAccountErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setAccountFeedback(
      "Account details were updated in this page's frontend state only; they are not saved permanently.",
    );
  }

  function updatePassword(field: keyof PasswordValues, value: string) {
    setPasswords((current) => ({ ...current, [field]: value }));
    setPasswordErrors((current) => ({ ...current, [field]: undefined }));
    setPasswordFeedback("");
  }

  function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: Partial<Record<keyof PasswordValues, string>> = {};
    if (!passwords.currentPassword) {
      errors.currentPassword = "Enter your current password.";
    }
    if (!passwords.newPassword) {
      errors.newPassword = "Enter a new password.";
    } else if (
      !passwordRequirementLabels.every((requirement) =>
        requirement.test(passwords.newPassword),
      )
    ) {
      errors.newPassword = "Your new password must meet every requirement below.";
    }
    if (!passwords.confirmNewPassword) {
      errors.confirmNewPassword = "Confirm your new password.";
    } else if (passwords.confirmNewPassword !== passwords.newPassword) {
      errors.confirmNewPassword = "Passwords do not match.";
    }
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setPasswords(initialPasswordValues);
    setPasswordFeedback(
      "The password passed frontend checks only. It was not changed, saved, sent, or verified.",
    );
  }

  function saveNotifications(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotificationFeedback(
      "Notification preferences were updated in this page's frontend state only; they are not saved permanently.",
    );
  }

  function updateNotification(
    field: keyof NotificationPreferences,
    checked: boolean,
  ) {
    setNotifications((current) => ({ ...current, [field]: checked }));
    setNotificationFeedback("");
  }

  const notificationOptions: {
    field: keyof NotificationPreferences;
    label: string;
  }[] = [
    { field: "enrollment", label: "Enrollment notifications" },
    { field: "academic", label: "Academic record updates" },
    { field: "library", label: "Library activity notifications" },
    { field: "integration", label: "System integration notifications" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl">System Settings</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Manage your system preferences and administrative configuration.
        </p>
      </header>

      <div
        className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-950"
        role="note"
      >
        Demonstration settings only. Changes stay in this page&apos;s temporary
        frontend state and are not saved to a database.
      </div>

      <section aria-labelledby="general-settings-heading">
        <Card className="space-y-5">
          <header>
            <h3 className="text-xl" id="general-settings-heading">
              General Settings
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              University and academic period details for this demonstration.
            </p>
          </header>
          <form className="space-y-5" noValidate onSubmit={saveGeneral}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                error={generalErrors.universityName}
                label="University Name"
                onChange={(event) =>
                  updateGeneral("universityName", event.currentTarget.value)
                }
                required
                value={general.universityName}
              />
              <Input
                error={generalErrors.systemName}
                label="System Name"
                onChange={(event) =>
                  updateGeneral("systemName", event.currentTarget.value)
                }
                required
                value={general.systemName}
              />
              <Input
                autoComplete="email"
                error={generalErrors.universityEmail}
                label="University Email"
                onChange={(event) =>
                  updateGeneral("universityEmail", event.currentTarget.value)
                }
                required
                type="email"
                value={general.universityEmail}
              />
              <Input
                error={generalErrors.academicYear}
                label="Academic Year"
                onChange={(event) =>
                  updateGeneral("academicYear", event.currentTarget.value)
                }
                required
                value={general.academicYear}
              />
              <div className="uc-field sm:col-span-2">
                <label className="uc-field__label" htmlFor="current-semester">
                  Current Semester
                  <span aria-hidden="true" className="uc-field__required">
                    *
                  </span>
                </label>
                <select
                  aria-describedby={
                    generalErrors.currentSemester
                      ? "current-semester-error"
                      : undefined
                  }
                  aria-invalid={generalErrors.currentSemester ? true : undefined}
                  className="uc-input"
                  id="current-semester"
                  onChange={(event) =>
                    updateGeneral("currentSemester", event.currentTarget.value)
                  }
                  required
                  value={general.currentSemester}
                >
                  <option value="">Select a semester</option>
                  <option>First Semester</option>
                  <option>Second Semester</option>
                  <option>Summer Term</option>
                </select>
                {generalErrors.currentSemester && (
                  <span className="uc-field__error" id="current-semester-error">
                    {generalErrors.currentSemester}
                  </span>
                )}
              </div>
            </div>
            {generalFeedback && (
              <p
                aria-live="polite"
                className="text-sm text-emerald-800"
                role="status"
              >
                {generalFeedback}
              </p>
            )}
            <Button type="submit">Save Changes</Button>
          </form>
        </Card>
      </section>

      <section aria-labelledby="account-settings-heading">
        <Card className="space-y-6">
          <header>
            <h3 className="text-xl" id="account-settings-heading">
              Account Settings
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Update the demonstration administrator profile or review password
              requirements.
            </p>
          </header>

          <form className="space-y-4" noValidate onSubmit={saveAccount}>
            <h4 className="text-base">Administrator Profile</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                autoComplete="name"
                error={accountErrors.administratorName}
                label="Administrator Name"
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setAccount((current) => ({
                    ...current,
                    administratorName: value,
                  }));
                  setAccountErrors((current) => ({
                    ...current,
                    administratorName: undefined,
                  }));
                  setAccountFeedback("");
                }}
                required
                value={account.administratorName}
              />
              <Input
                autoComplete="email"
                error={accountErrors.administratorEmail}
                label="Administrator Email"
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setAccount((current) => ({
                    ...current,
                    administratorEmail: value,
                  }));
                  setAccountErrors((current) => ({
                    ...current,
                    administratorEmail: undefined,
                  }));
                  setAccountFeedback("");
                }}
                required
                type="email"
                value={account.administratorEmail}
              />
            </div>
            {accountFeedback && (
              <p
                aria-live="polite"
                className="text-sm text-emerald-800"
                role="status"
              >
                {accountFeedback}
              </p>
            )}
            <Button type="submit" variant="outline">
              Save Account Details
            </Button>
          </form>

          <div className="border-t border-border pt-5">
            <h4 className="mb-1 text-base">Change Password</h4>
            <p className="mb-4 text-sm text-zinc-500">
              Passwords are checked in this form only. The current password
              cannot be verified without a backend.
            </p>
            <form className="space-y-4" noValidate onSubmit={changePassword}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  autoComplete="current-password"
                  error={passwordErrors.currentPassword}
                  label="Current Password"
                  onChange={(event) =>
                    updatePassword(
                      "currentPassword",
                      event.currentTarget.value,
                    )
                  }
                  required
                  type="password"
                  value={passwords.currentPassword}
                />
                <div>
                  <Input
                    autoComplete="new-password"
                    error={passwordErrors.newPassword}
                    label="New Password"
                    onChange={(event) =>
                      updatePassword("newPassword", event.currentTarget.value)
                    }
                    required
                    type="password"
                    value={passwords.newPassword}
                  />
                  <ul
                    aria-label="Password requirements"
                    aria-live="polite"
                    className="mt-3 grid gap-1.5 text-xs"
                  >
                    {passwordRequirementLabels.map((requirement) => {
                      const isMet = requirement.test(passwords.newPassword);
                      return (
                        <li
                          className={`flex items-center gap-2 ${
                            isMet ? "text-emerald-700" : "text-zinc-500"
                          }`}
                          key={requirement.label}
                        >
                          <Check
                            aria-hidden="true"
                            className={isMet ? "opacity-100" : "opacity-30"}
                            size={14}
                            strokeWidth={2.5}
                          />
                          {requirement.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Input
                  autoComplete="new-password"
                  error={passwordErrors.confirmNewPassword}
                  label="Confirm New Password"
                  onChange={(event) =>
                    updatePassword(
                      "confirmNewPassword",
                      event.currentTarget.value,
                    )
                  }
                  required
                  type="password"
                  value={passwords.confirmNewPassword}
                />
              </div>
              {passwordFeedback && (
                <p
                  aria-live="polite"
                  className="text-sm text-emerald-800"
                  role="status"
                >
                  {passwordFeedback}
                </p>
              )}
              <Button type="submit" variant="outline">
                Check Password
              </Button>
            </form>
          </div>
        </Card>
      </section>

      <section aria-labelledby="appearance-heading">
        <Card className="space-y-4">
          <header className="flex items-start gap-3">
            <Sun aria-hidden="true" className="mt-1 text-navy" size={20} />
            <div>
              <h3 className="text-xl" id="appearance-heading">
                Appearance Settings
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Theme switching is not yet available across the full interface.
              </p>
            </div>
          </header>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
              <input
                aria-label="Light Mode, current appearance"
                checked
                disabled
                type="radio"
              />
              <span className="text-sm font-medium">Light Mode</span>
              <Badge variant="success">Current</Badge>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
              <input
                aria-label="Dark Mode, future feature"
                disabled
                type="radio"
              />
              <span className="text-sm text-zinc-500">Dark Mode</span>
              <Badge variant="neutral">Future feature</Badge>
            </div>
          </div>
        </Card>
      </section>

      <section aria-labelledby="notification-settings-heading">
        <Card className="space-y-5">
          <header className="flex items-start gap-3">
            <Bell aria-hidden="true" className="mt-1 text-navy" size={20} />
            <div>
              <h3 className="text-xl" id="notification-settings-heading">
                Notification Preferences
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Select which demonstration updates you want to receive.
              </p>
            </div>
          </header>
          <form className="space-y-5" onSubmit={saveNotifications}>
            <div className="grid gap-3 sm:grid-cols-2">
              {notificationOptions.map(({ field, label }) => (
                <label
                  className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 text-sm text-zinc-700"
                  key={field}
                >
                  <input
                    checked={notifications[field]}
                    className="mt-0.5 h-4 w-4 accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    onChange={(event) =>
                      updateNotification(field, event.currentTarget.checked)
                    }
                    type="checkbox"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {notificationFeedback && (
              <p
                aria-live="polite"
                className="text-sm text-emerald-800"
                role="status"
              >
                {notificationFeedback}
              </p>
            )}
            <Button type="submit" variant="outline">
              Save Preferences
            </Button>
          </form>
        </Card>
      </section>

      <section aria-labelledby="privacy-security-heading">
        <Card className="space-y-5">
          <header className="flex items-start gap-3">
            <ShieldCheck
              aria-hidden="true"
              className="mt-1 text-navy"
              size={20}
            />
            <div>
              <h3 className="text-xl" id="privacy-security-heading">
                Privacy and Security
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Informational guidance only; these items do not enforce backend
                security.
              </p>
            </div>
            <Badge className="ml-auto" variant="neutral">
              Informational
            </Badge>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Role-Based Access Control",
                description:
                  "Roles are shown for demonstration. This frontend does not enforce permissions or access restrictions.",
                icon: LockKeyhole,
              },
              {
                title: "Data Privacy",
                description:
                  "Sample data is fictional. These settings do not control or protect real university records.",
                icon: ShieldCheck,
              },
              {
                title: "Session Security",
                description:
                  "Session management and security policies require backend integration and are not configured here.",
                icon: Bell,
              },
            ].map(({ title, description, icon: Icon }) => (
              <div className="rounded-md border border-border p-4" key={title}>
                <Icon aria-hidden="true" className="mb-3 text-navy" size={19} />
                <h4 className="font-semibold text-midnight">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
