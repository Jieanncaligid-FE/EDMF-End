"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookOpen,
  Eye,
  FileText,
  Library,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { dashboardMetrics } from "@/data/admin-dashboard";
import {
  academicPerformanceDistribution,
  analyticsEnrollmentTrends,
  analyticsReports,
  libraryUsageByMonth,
  studentDistributionByCourse,
} from "@/data/admin-analytics";

const chartTooltipStyle = {
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  boxShadow: "0 4px 16px rgb(5 11 25 / 8%)",
};

const metrics = [
  {
    label: "Total Students",
    value: dashboardMetrics[0].value,
    icon: Users,
  },
  {
    label: "Total Enrollments",
    value: dashboardMetrics[1].value,
    icon: UserRoundCheck,
  },
  {
    label: "Active Courses",
    value: dashboardMetrics[2].value,
    icon: BookOpen,
  },
  {
    label: "Library Transactions",
    value: dashboardMetrics[3].value,
    icon: Library,
  },
] as const;

type AnalyticsReport = (typeof analyticsReports)[number];

export default function AdminAnalyticsPage() {
  const [selectedReport, setSelectedReport] =
    useState<AnalyticsReport | null>(null);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl">Analytics and Reports</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Explore university statistics and insights from integrated data.
        </p>
      </header>

      <div
        className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-950"
        role="note"
      >
        Demonstration data only. Figures and visualizations are fictional
        frontend samples, not live university records.
      </div>

      <section
        aria-label="Analytics demonstration metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              className="flex items-start justify-between gap-3 p-5"
              key={metric.label}
            >
              <div>
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
      </section>

      <section aria-label="Demonstration analytics charts" className="grid gap-6 lg:grid-cols-2">
        <Card className="min-w-0 p-4 sm:p-5">
          <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl">Enrollment Trends</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Sample monthly enrollments, January–June
              </p>
            </div>
            <Badge variant="neutral">Demo data</Badge>
          </header>
          <div
            aria-label="Area chart of monthly sample enrollment from January to June"
            className="h-64 min-w-0 sm:h-72"
            role="img"
          >
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart
                data={analyticsEnrollmentTrends}
                margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
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
                  width={44}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area
                  dataKey="enrollments"
                  fill="rgb(229 184 63 / 20%)"
                  name="Enrollments"
                  stroke="#E5B83F"
                  strokeWidth={3}
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="min-w-0 p-4 sm:p-5">
          <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl">Student Distribution by Course</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Fictional student counts by program
              </p>
            </div>
            <Badge variant="neutral">Demo data</Badge>
          </header>
          <div
            aria-label="Bar chart showing sample student counts by course"
            className="h-72 min-w-0 sm:h-80"
            role="img"
          >
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                data={studentDistributionByCourse}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  horizontal={false}
                  stroke="#E5E7EB"
                  strokeDasharray="3 3"
                />
                <XAxis
                  axisLine={false}
                  type="number"
                  tick={{ fill: "#71717A", fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  dataKey="course"
                  type="category"
                  width={148}
                  tick={{ fill: "#52525B", fontSize: 10 }}
                  tickLine={false}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar
                  dataKey="students"
                  fill="#0B1730"
                  maxBarSize={24}
                  name="Students"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="min-w-0 p-4 sm:p-5">
          <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl">Academic Performance</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Distribution by academic standing
              </p>
            </div>
            <Badge variant="neutral">Demo data</Badge>
          </header>
          <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(9rem,0.8fr)]">
            <div
              aria-label="Donut chart showing sample academic standing distribution"
              className="h-64 min-w-0"
              role="img"
            >
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Pie
                    data={academicPerformanceDistribution}
                    dataKey="students"
                    innerRadius={58}
                    nameKey="name"
                    outerRadius={94}
                    paddingAngle={3}
                  >
                    {academicPerformanceDistribution.map((item) => (
                      <Cell fill={item.color} key={item.name} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-3">
              {academicPerformanceDistribution.map((item) => (
                <li
                  className="flex items-center justify-between gap-3 text-sm"
                  key={item.name}
                >
                  <span className="flex min-w-0 items-center gap-2 text-zinc-600">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </span>
                  <span className="font-mono font-semibold tabular-nums text-midnight">
                    {item.students.toLocaleString("en-US")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="min-w-0 p-4 sm:p-5">
          <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl">Library Usage</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Sample monthly borrowing transactions, January–June
              </p>
            </div>
            <Badge variant="neutral">Demo data</Badge>
          </header>
          <div
            aria-label="Bar chart showing monthly sample library borrowing transactions"
            className="h-64 min-w-0 sm:h-72"
            role="img"
          >
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                data={libraryUsageByMonth}
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
                  tick={{ fill: "#71717A", fontSize: 11 }}
                  tickLine={false}
                  width={48}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar
                  dataKey="transactions"
                  fill="#E5B83F"
                  maxBarSize={42}
                  name="Transactions"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section aria-labelledby="analytics-reports-heading" className="space-y-4">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl" id="analytics-reports-heading">
              Reports
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Open a sample report summary
            </p>
          </div>
          <Badge variant="neutral">Simulated reports</Badge>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          {analyticsReports.map((report) => (
            <Card
              className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center"
              key={report.id}
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/15 text-navy">
                  <FileText aria-hidden="true" size={19} />
                </span>
                <div className="min-w-0">
                  <h4 className="text-lg">{report.name}</h4>
                  <p className="mt-1 text-sm leading-5 text-zinc-600">
                    {report.description}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    Last generated: {report.generatedAt}
                  </p>
                </div>
              </div>
              <Button
                className="shrink-0"
                onClick={() => setSelectedReport(report)}
                variant="outline"
              >
                <Eye aria-hidden="true" size={17} />
                View Report
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <Modal
        footer={
          <Button
            onClick={() => setSelectedReport(null)}
            variant="outline"
          >
            Close
          </Button>
        }
        onClose={() => setSelectedReport(null)}
        open={selectedReport !== null}
        title={selectedReport?.name ?? "Report summary"}
      >
        {selectedReport && (
          <div className="space-y-4">
            <p className="text-sm leading-6 text-zinc-700">
              {selectedReport.summary}
            </p>
            <p className="text-xs text-zinc-500">
              Summary uses fictional demonstration data. Last generated:{" "}
              {selectedReport.generatedAt}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
