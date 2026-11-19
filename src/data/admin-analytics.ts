import { enrollmentOverview } from "@/data/admin-dashboard";

export const analyticsEnrollmentTrends = enrollmentOverview.map((entry) => ({
  month: entry.month,
  enrollments: entry.students,
}));

export const studentDistributionByCourse = [
  { course: "Computer Science", students: 620 },
  { course: "Business Administration", students: 510 },
  { course: "Nursing", students: 420 },
  { course: "Psychology", students: 360 },
  { course: "Information Technology", students: 310 },
  { course: "Civil Engineering", students: 230 },
] as const;

export const academicPerformanceDistribution = [
  { name: "Good Standing", students: 1850, color: "#0B1730" },
  { name: "At Risk", students: 230, color: "#E5B83F" },
  { name: "Incomplete", students: 100, color: "#A1A1AA" },
] as const;

export const libraryUsageByMonth = [
  { month: "Jan", transactions: 1100 },
  { month: "Feb", transactions: 980 },
  { month: "Mar", transactions: 1250 },
  { month: "Apr", transactions: 1320 },
  { month: "May", transactions: 1180 },
  { month: "Jun", transactions: 1410 },
] as const;

export const analyticsReports = [
  {
    id: "student-enrollment",
    name: "Student Enrollment Report",
    description:
      "A summarized view of sample enrollments across the academic year.",
    generatedAt: "Nov 18, 2026 · 4:30 PM (simulated)",
    summary:
      "The demonstration dataset includes 2,180 total enrollments. Monthly sample enrollment figures trend upward from January through June.",
  },
  {
    id: "academic-performance",
    name: "Academic Performance Report",
    description:
      "A snapshot of academic standing across the sample student records.",
    generatedAt: "Nov 18, 2026 · 3:15 PM (simulated)",
    summary:
      "Sample standing distribution: 1,850 students in good standing, 230 at risk, and 100 with incomplete records.",
  },
  {
    id: "library-usage",
    name: "Library Usage Report",
    description:
      "Monthly borrowing activity from the fictional library transaction dataset.",
    generatedAt: "Nov 17, 2026 · 11:00 AM (simulated)",
    summary:
      "The demonstration library dataset shows monthly transactions from January through June, with the highest sample volume in June.",
  },
  {
    id: "integration-summary",
    name: "Data Integration Summary",
    description:
      "An overview of simulated data-source status and sample integration activity.",
    generatedAt: "Nov 17, 2026 · 9:45 AM (simulated)",
    summary:
      "Three sample source systems are represented: two marked connected and one marked synchronization pending. These are frontend-only demonstration statuses.",
  },
] as const;
