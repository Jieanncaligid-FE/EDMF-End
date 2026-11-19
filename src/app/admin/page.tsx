"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookOpen,
  ClipboardList,
  Database,
  GraduationCap,
  Info,
  Library,
  UserRoundCheck,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  dashboardMetrics,
  dataSourceStatuses,
  enrollmentOverview,
  recentActivities,
} from "@/data/admin-dashboard";

const metricIcons = {
  totalStudents: Users,
  enrolledStudents: UserRoundCheck,
  activeCourses: BookOpen,
  libraryTransactions: Library,
};

const activityIcons = {
  student: UserRoundPlus,
  enrollment: ClipboardList,
  library: Library,
  academics: GraduationCap,
};

export default function AdminPage() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    );
  }, []);

  return (
    <div className="space-y-6">
          <section
            aria-labelledby="welcome-heading"
            className="flex flex-col justify-between gap-4 rounded-lg bg-navy px-5 py-6 text-white sm:flex-row sm:items-center sm:px-7"
          >
            <div>
              <p className="mb-2 text-sm font-medium text-white/75">
                Admin overview
              </p>
              <h2 className="text-2xl text-white" id="welcome-heading">
                Welcome back, Administrator
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                Here&apos;s an overview of your university&apos;s student data
                and system activity.
              </p>
            </div>
            {today && (
              <p className="shrink-0 text-sm text-white/75" aria-label="Today">
                {today}
              </p>
            )}
          </section>

          <div
            className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-950"
            role="note"
          >
            <Info
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-amber-700"
              size={17}
            />
            <p>
              Demonstration data only: all figures, activities, and system
              statuses on this dashboard are simulated and are not live
              university records or connections.
            </p>
          </div>

          <section aria-label="Sample summary metrics">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardMetrics.map((metric) => {
                const Icon = metricIcons[metric.id];

                return (
                  <Card
                    className="flex min-w-0 items-start justify-between gap-3 p-5"
                    key={metric.id}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-600">
                        {metric.label}
                      </p>
                      <p className="mt-3 font-mono text-2xl font-semibold tabular-nums text-midnight">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-xs text-zinc-500">
                        Sample demonstration figure
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/15 text-navy">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                  </Card>
                );
              })}
            </div>
          </section>

          <div className="grid min-w-0 gap-6 xl:grid-cols-3">
            <Card className="min-w-0 p-5 sm:p-6 xl:col-span-2">
              <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl">Enrollment Overview</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Sample monthly enrollment, January–June
                  </p>
                </div>
                <Badge variant="neutral">Demo data</Badge>
              </header>
              <div
                aria-label="Bar chart showing sample monthly enrollment from January to June"
                className="h-64 min-w-0 sm:h-72"
                role="img"
              >
                <ResponsiveContainer height="100%" width="100%">
                  <BarChart
                    data={enrollmentOverview}
                    margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="#E5E7EB"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      axisLine={false}
                      dataKey="month"
                      tick={{ fill: "#71717A", fontSize: 12 }}
                      tickLine={false}
                      tickMargin={10}
                    />
                    <YAxis
                      axisLine={false}
                      allowDecimals={false}
                      tick={{ fill: "#71717A", fontSize: 12 }}
                      tickLine={false}
                      tickMargin={8}
                      width={44}
                    />
                    <Tooltip
                      contentStyle={{
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 4px 16px rgb(5 11 25 / 8%)",
                      }}
                      cursor={{ fill: "rgb(5 11 25 / 4%)" }}
                    />
                    <Bar
                      dataKey="students"
                      fill="#E5B83F"
                      maxBarSize={48}
                      name="Students"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <header className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl">Recent Activities</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Simulated activity feed
                  </p>
                </div>
                <Badge variant="neutral">Demo</Badge>
              </header>
              <ul className="space-y-5">
                {recentActivities.map((activity) => {
                  const Icon = activityIcons[activity.type];

                  return (
                    <li className="flex gap-3" key={activity.id}>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-light text-navy">
                        <Icon aria-hidden="true" size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-midnight">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-zinc-600">
                          {activity.description}
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                          {activity.date}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card className="p-5 sm:p-6 xl:col-span-3">
              <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl">Data Source Status</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Simulated frontend demonstration statuses
                  </p>
                </div>
                <Badge variant="neutral">Not live connections</Badge>
              </header>
              <ul className="grid gap-3 md:grid-cols-3">
                {dataSourceStatuses.map((source) => (
                  <li
                    className="flex min-w-0 items-start justify-between gap-3 rounded-md border border-border bg-white p-4"
                    key={source.id}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 text-zinc-500">
                        <Database aria-hidden="true" size={18} />
                      </span>
                      <p className="text-sm font-medium leading-5 text-midnight">
                        {source.name}
                      </p>
                    </div>
                    <Badge
                      variant={
                        source.status === "Connected" ? "success" : "warning"
                      }
                    >
                      {source.status}
                    </Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-zinc-500">
                These statuses are simulated for the frontend demonstration and
                do not represent real system connections or synchronization.
              </p>
            </Card>
          </div>
    </div>
  );
}
