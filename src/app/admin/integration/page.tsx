"use client";

import { Fragment, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  Database,
  Eye,
  GraduationCap,
  Library,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  integrationActivities,
  integrationSources,
} from "@/data/admin-integration";

const activityStatusVariants: Record<string, BadgeVariant> = {
  Completed: "success",
  Pending: "warning",
  Information: "neutral",
};

const flowStages = [
  {
    title: "Source Systems",
    description: "SIS · LMS · Library",
    icon: Database,
  },
  {
    title: "API Integration + ETL",
    description: "Structured data exchange",
    icon: RefreshCw,
  },
  {
    title: "Data Validation and Governance",
    description: "Quality and access checks",
    icon: ShieldCheck,
  },
  {
    title: "Central Data Warehouse",
    description: "Organized university data",
    icon: Database,
  },
  {
    title: "Unified Reports and Analytics",
    description: "Consistent decision support",
    icon: BarChart3,
  },
] as const;

const governanceItems = [
  {
    title: "Data Security and Privacy",
    description:
      "Security and privacy practices protect sensitive information through controlled access, appropriate handling, and privacy-aware data use.",
    icon: ShieldCheck,
  },
  {
    title: "Role-Based Access Control",
    description:
      "Access is assigned by role so administrators and other users see only the information and actions needed for their responsibilities.",
    icon: GraduationCap,
  },
  {
    title: "Data Quality Management",
    description:
      "Validation, consistency checks, and clear data ownership help keep integrated information accurate and useful.",
    icon: BookOpen,
  },
] as const;

function getSimulatedTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

export default function AdminIntegrationPage() {
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedActivity, setSelectedActivity] =
    useState<(typeof integrationActivities)[number] | null>(null);
  const [lastSync, setLastSync] = useState("Nov 19, 2026 · 1:15 AM");
  const [syncFeedback, setSyncFeedback] = useState("");

  const filteredActivities = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return integrationActivities.filter((activity) => {
      const matchesSearch =
        !normalizedQuery ||
        [
          activity.id,
          activity.source,
          activity.method,
          activity.description,
          activity.dateTime,
          activity.status,
        ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
      const matchesSource = !sourceFilter || activity.source === sourceFilter;
      const matchesStatus = !statusFilter || activity.status === statusFilter;
      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [query, sourceFilter, statusFilter]);

  function simulateSync() {
    const timestamp = getSimulatedTimestamp();
    setLastSync(timestamp);
    setSyncFeedback(
      `Demo synchronization simulated at ${timestamp}. No external systems were contacted and no data was transferred.`,
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl">Data Integration</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Monitor connected university data sources and integration activities.
        </p>
      </header>

      <div
        className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-950"
        role="note"
      >
        Demonstration only: source statuses, timestamps, and activity records
        are simulated. No external systems are connected.
      </div>

      <section
        aria-label="Integration overview demonstration metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {[
          { label: "Total Data Sources", value: "3" },
          { label: "Connected Sources", value: "2" },
          { label: "Pending Synchronization", value: "1" },
          { label: "Last Synchronization", value: lastSync },
        ].map((metric) => (
          <Card className="p-5" key={metric.label}>
            <p className="text-sm font-medium text-zinc-600">{metric.label}</p>
            <p
              className={`mt-3 font-semibold text-midnight ${
                metric.label === "Last Synchronization"
                  ? "text-base leading-6"
                  : "font-mono text-2xl tabular-nums"
              }`}
            >
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-zinc-500">Simulated demo value</p>
          </Card>
        ))}
      </section>

      <section aria-labelledby="data-sources-heading" className="space-y-4">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl" id="data-sources-heading">
              Data Sources
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Example source systems and integration methods
            </p>
          </div>
          <Button onClick={simulateSync}>
            <RefreshCw aria-hidden="true" size={17} />
            Sync Now
          </Button>
        </header>

        {syncFeedback && (
          <p
            aria-live="polite"
            className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
            role="status"
          >
            {syncFeedback}
          </p>
        )}

        <div className="grid gap-4 lg:grid-cols-3">
          {integrationSources.map((source) => (
            <Card className="flex h-full flex-col gap-4 p-5" key={source.id}>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gold/15 text-navy">
                  {source.id === "sis" ? (
                    <GraduationCap aria-hidden="true" size={21} />
                  ) : source.id === "lms" ? (
                    <BookOpen aria-hidden="true" size={21} />
                  ) : (
                    <Library aria-hidden="true" size={21} />
                  )}
                </span>
                <Badge
                  variant={source.status === "Connected" ? "success" : "warning"}
                >
                  {source.status}
                </Badge>
              </div>
              <div>
                <h4 className="text-lg">{source.name}</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {source.description}
                </p>
              </div>
              <div className="mt-auto border-t border-border pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Integration Method
                </p>
                <p className="mt-1 text-sm font-semibold text-midnight">
                  {source.method}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card className="space-y-5 p-4 sm:p-6">
        <header>
          <h3 className="text-2xl">Integration Flow</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Conceptual path for the UniConnect data integration process
          </p>
        </header>
        <div className="flex flex-col items-stretch gap-2 xl:flex-row xl:items-stretch">
          {flowStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Fragment key={stage.title}>
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-border bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-light text-navy">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm">{stage.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {stage.description}
                    </p>
                  </div>
                </div>
                {index < flowStages.length - 1 && (
                  <>
                    <ArrowDown
                      aria-hidden="true"
                      className="mx-auto text-zinc-400 xl:hidden"
                      size={18}
                    />
                    <ArrowRight
                      aria-hidden="true"
                      className="hidden self-center text-zinc-400 xl:block"
                      size={18}
                    />
                  </>
                )}
              </Fragment>
            );
          })}
        </div>
        <p className="text-xs text-zinc-500">
          Conceptual demonstration flow only; no data is being processed.
        </p>
      </Card>

      <Card className="space-y-4 p-4 sm:p-5">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl">Integration Activity Log</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Fictional integration events for this frontend demonstration
            </p>
          </div>
          <Badge variant="neutral">Demo activity</Badge>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <label className="relative min-w-0">
            <span className="sr-only">Search integration activity</span>
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={17}
            />
            <input
              className="uc-input pl-10"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search integration activity"
              type="search"
              value={query}
            />
          </label>
          <label className="uc-field">
            <span className="uc-field__label">Source system</span>
            <select
              aria-label="Source system"
              className="uc-input"
              onChange={(event) => setSourceFilter(event.target.value)}
              value={sourceFilter}
            >
              <option value="">All source systems</option>
              {integrationSources.map((source) => (
                <option key={source.id} value={source.name}>
                  {source.name}
                </option>
              ))}
            </select>
          </label>
          <label className="uc-field">
            <span className="uc-field__label">Activity status</span>
            <select
              aria-label="Activity status"
              className="uc-input"
              onChange={(event) => setStatusFilter(event.target.value)}
              value={statusFilter}
            >
              <option value="">All statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Information">Information</option>
            </select>
          </label>
        </div>

        <p aria-live="polite" className="text-sm text-zinc-600">
          Showing {filteredActivities.length} demonstration{" "}
          {filteredActivities.length === 1 ? "activity" : "activities"}
        </p>

        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[68rem] border-collapse text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                {[
                  "Activity ID",
                  "Source System",
                  "Integration Method",
                  "Activity Description",
                  "Date and Time",
                  "Status",
                  "Actions",
                ].map((column) => (
                  <th
                    className="border-y border-border px-4 py-3 font-semibold"
                    key={column}
                    scope="col"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredActivities.map((activity) => (
                <tr className="bg-white" key={activity.id}>
                  <td className="px-4 py-3.5 font-mono text-xs text-zinc-700">
                    {activity.id}
                  </td>
                  <td className="max-w-56 px-4 py-3.5 text-zinc-700">
                    {activity.source}
                  </td>
                  <td className="px-4 py-3.5 text-zinc-700">
                    {activity.method}
                  </td>
                  <td className="px-4 py-3.5 text-zinc-700">
                    {activity.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-zinc-700">
                    {activity.dateTime}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={activityStatusVariants[activity.status]}>
                      {activity.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      aria-label={`View ${activity.id} details`}
                      className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-midnight"
                      onClick={() => setSelectedActivity(activity)}
                      type="button"
                    >
                      <Eye aria-hidden="true" size={17} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredActivities.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-12 text-center text-zinc-500"
                    colSpan={7}
                  >
                    No activities match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <section aria-labelledby="governance-heading" className="space-y-4">
        <header>
          <h3 className="text-2xl" id="governance-heading">
            Data Governance
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            Principles for protecting and managing integrated university data
          </p>
        </header>
        <div className="grid gap-4 lg:grid-cols-3">
          {governanceItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card className="flex items-start gap-4 p-5" key={item.title}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/15 text-navy">
                  <Icon aria-hidden="true" size={19} />
                </span>
                <div>
                  <h4 className="text-lg">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
        <p className="text-xs leading-5 text-zinc-500">
          These are governance principles for demonstration purposes, not active
          security controls or access policies.
        </p>
      </section>

      <Modal
        footer={
          <Button
            onClick={() => setSelectedActivity(null)}
            variant="outline"
          >
            Close
          </Button>
        }
        onClose={() => setSelectedActivity(null)}
        open={selectedActivity !== null}
        title={
          selectedActivity
            ? `Activity ${selectedActivity.id}`
            : "Activity details"
        }
      >
        {selectedActivity && (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Source system
              </dt>
              <dd className="mt-1 text-sm font-medium text-midnight">
                {selectedActivity.source}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Integration method
              </dt>
              <dd className="mt-1 text-sm font-medium text-midnight">
                {selectedActivity.method}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Date and time
              </dt>
              <dd className="mt-1 text-sm font-medium text-midnight">
                {selectedActivity.dateTime}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Status
              </dt>
              <dd className="mt-1">
                <Badge
                  variant={activityStatusVariants[selectedActivity.status]}
                >
                  {selectedActivity.status}
                </Badge>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Details
              </dt>
              <dd className="mt-1 text-sm leading-6 text-zinc-700">
                {selectedActivity.details}
              </dd>
            </div>
          </dl>
        )}
      </Modal>
    </div>
  );
}
