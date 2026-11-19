export const integrationSources = [
  {
    id: "sis",
    name: "Student Information System (SIS)",
    description:
      "Provides student profiles, enrollment, and academic records.",
    status: "Connected",
    method: "API Integration + ETL",
  },
  {
    id: "lms",
    name: "Learning Management System (LMS)",
    description: "Provides course information, learning activities, and grades.",
    status: "Connected",
    method: "API Integration",
  },
  {
    id: "library",
    name: "Library Management System",
    description: "Provides book information and borrowing transactions.",
    status: "Synchronization Pending",
    method: "ETL",
  },
] as const;

export const integrationActivities = [
  {
    id: "ACT-2026-041",
    source: "Student Information System (SIS)",
    method: "API Integration + ETL",
    description: "Student records synchronized.",
    dateTime: "Nov 19, 2026 · 1:05 AM",
    status: "Completed",
    details:
      "A simulated SIS activity indicates a completed transfer of sample student profile and enrollment data to the demonstration integration layer.",
  },
  {
    id: "ACT-2026-040",
    source: "Learning Management System (LMS)",
    method: "API Integration",
    description: "LMS course data received.",
    dateTime: "Nov 19, 2026 · 12:48 AM",
    status: "Completed",
    details:
      "Sample course and learning activity information was marked as received in this frontend-only activity log.",
  },
  {
    id: "ACT-2026-039",
    source: "Library Management System",
    method: "ETL",
    description: "Library data synchronization pending.",
    dateTime: "Nov 18, 2026 · 11:30 PM",
    status: "Pending",
    details:
      "The library source is shown as pending for demonstration purposes. No external library system was contacted.",
  },
  {
    id: "ACT-2026-038",
    source: "Student Information System (SIS)",
    method: "Data Governance",
    description: "Data quality validation completed.",
    dateTime: "Nov 18, 2026 · 10:15 PM",
    status: "Completed",
    details:
      "A simulated validation event represents checks for completeness and consistency before data is used in unified reports.",
  },
  {
    id: "ACT-2026-037",
    source: "Learning Management System (LMS)",
    method: "API Integration",
    description: "Course activity sample reviewed.",
    dateTime: "Nov 18, 2026 · 9:40 PM",
    status: "Information",
    details:
      "This informational entry is a fictional example of an integration review; it does not represent live LMS data.",
  },
] as const;
