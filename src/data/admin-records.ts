import type { AdminRecordsConfig } from "@/types/admin-record";

const courses = [
  "Computer Science",
  "Business Administration",
  "Nursing",
  "Psychology",
  "Information Technology",
  "Civil Engineering",
];

const yearLevels = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
];

const students = [
  {
    id: "student-1",
    studentId: "UC-2023-0142",
    fullName: "Amara Santos",
    email: "amara.santos@example.com",
    course: "Computer Science",
    yearLevel: "3rd Year",
    status: "Active",
  },
  {
    id: "student-2",
    studentId: "UC-2022-0087",
    fullName: "Noah Reyes",
    email: "noah.reyes@example.com",
    course: "Business Administration",
    yearLevel: "4th Year",
    status: "Active",
  },
  {
    id: "student-3",
    studentId: "UC-2024-0261",
    fullName: "Mikaela Cruz",
    email: "mikaela.cruz@example.com",
    course: "Nursing",
    yearLevel: "2nd Year",
    status: "Active",
  },
  {
    id: "student-4",
    studentId: "UC-2021-0035",
    fullName: "Ethan Lim",
    email: "ethan.lim@example.com",
    course: "Information Technology",
    yearLevel: "5th Year",
    status: "Inactive",
  },
  {
    id: "student-5",
    studentId: "UC-2023-0198",
    fullName: "Sofia Mendoza",
    email: "sofia.mendoza@example.com",
    course: "Psychology",
    yearLevel: "3rd Year",
    status: "Active",
  },
  {
    id: "student-6",
    studentId: "UC-2025-0314",
    fullName: "Lucas Navarro",
    email: "lucas.navarro@example.com",
    course: "Civil Engineering",
    yearLevel: "1st Year",
    status: "Active",
  },
  {
    id: "student-7",
    studentId: "UC-2022-0116",
    fullName: "Isabel Flores",
    email: "isabel.flores@example.com",
    course: "Computer Science",
    yearLevel: "4th Year",
    status: "Inactive",
  },
  {
    id: "student-8",
    studentId: "UC-2024-0229",
    fullName: "Gabriel Dela Cruz",
    email: "gabriel.delacruz@example.com",
    course: "Business Administration",
    yearLevel: "2nd Year",
    status: "Active",
  },
];

export const studentRecordsConfig: AdminRecordsConfig = {
  title: "Student Management",
  description: "View and manage university student information.",
  recordName: "student",
  searchPlaceholder: "Search by name or Student ID",
  searchKeys: ["fullName", "studentId"],
  seedRecords: students,
  summary: [
    { label: "Total Students", value: "2,450" },
    { label: "Active Students", value: "2,180" },
    { label: "Inactive Students", value: "170" },
    { label: "New Students", value: "100" },
  ],
  fields: [
    { name: "studentId", label: "Student ID", type: "text", required: true },
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "University Email", type: "email", required: true },
    {
      name: "course",
      label: "Course / Program",
      type: "select",
      options: courses,
      required: true,
    },
    {
      name: "yearLevel",
      label: "Year Level",
      type: "select",
      options: yearLevels,
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
      required: true,
    },
  ],
  columns: [
    { key: "studentId", label: "Student ID" },
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "course", label: "Course" },
    { key: "yearLevel", label: "Year Level" },
    { key: "status", label: "Status" },
  ],
  filters: [
    { key: "course", label: "Course", allLabel: "All courses", options: courses },
    {
      key: "status",
      label: "Student status",
      allLabel: "All statuses",
      options: ["Active", "Inactive"],
    },
  ],
  statusField: "status",
  statusVariants: { Active: "success", Inactive: "neutral" },
  validate(values, records, editingId) {
    const errors: Record<string, string> = {};
    const duplicate = records.some(
      (record) =>
        record.id !== editingId &&
        record.studentId.toLowerCase() === values.studentId.toLowerCase(),
    );
    if (duplicate) errors.studentId = "This Student ID is already in use.";
    return errors;
  },
};

const enrollments = [
  {
    id: "enrollment-1",
    enrollmentId: "EN-2026-1042",
    studentId: "UC-2023-0142",
    studentName: "Amara Santos",
    course: "Computer Science",
    academicYear: "2026-2027",
    semester: "1st Semester",
    enrollmentDate: "2026-08-12",
    status: "Fully Enrolled",
  },
  {
    id: "enrollment-2",
    enrollmentId: "EN-2026-1038",
    studentId: "UC-2022-0087",
    studentName: "Noah Reyes",
    course: "Business Administration",
    academicYear: "2026-2027",
    semester: "1st Semester",
    enrollmentDate: "2026-08-11",
    status: "Fully Enrolled",
  },
  {
    id: "enrollment-3",
    enrollmentId: "EN-2026-1021",
    studentId: "UC-2024-0261",
    studentName: "Mikaela Cruz",
    course: "Nursing",
    academicYear: "2026-2027",
    semester: "1st Semester",
    enrollmentDate: "2026-08-10",
    status: "Pending",
  },
  {
    id: "enrollment-4",
    enrollmentId: "EN-2026-0994",
    studentId: "UC-2021-0035",
    studentName: "Ethan Lim",
    course: "Information Technology",
    academicYear: "2026-2027",
    semester: "1st Semester",
    enrollmentDate: "2026-08-08",
    status: "Not Enrolled",
  },
  {
    id: "enrollment-5",
    enrollmentId: "EN-2025-0873",
    studentId: "UC-2023-0198",
    studentName: "Sofia Mendoza",
    course: "Psychology",
    academicYear: "2025-2026",
    semester: "2nd Semester",
    enrollmentDate: "2026-01-15",
    status: "Fully Enrolled",
  },
  {
    id: "enrollment-6",
    enrollmentId: "EN-2026-0978",
    studentId: "UC-2025-0314",
    studentName: "Lucas Navarro",
    course: "Civil Engineering",
    academicYear: "2026-2027",
    semester: "1st Semester",
    enrollmentDate: "2026-08-07",
    status: "Pending",
  },
  {
    id: "enrollment-7",
    enrollmentId: "EN-2025-0811",
    studentId: "UC-2022-0116",
    studentName: "Isabel Flores",
    course: "Computer Science",
    academicYear: "2025-2026",
    semester: "2nd Semester",
    enrollmentDate: "2026-01-12",
    status: "Fully Enrolled",
  },
  {
    id: "enrollment-8",
    enrollmentId: "EN-2026-0963",
    studentId: "UC-2024-0229",
    studentName: "Gabriel Dela Cruz",
    course: "Business Administration",
    academicYear: "2026-2027",
    semester: "1st Semester",
    enrollmentDate: "2026-08-06",
    status: "Pending",
  },
];

export const enrollmentRecordsConfig: AdminRecordsConfig = {
  title: "Enrollment Management",
  description: "Monitor student enrollment and registration records.",
  recordName: "enrollment",
  searchPlaceholder: "Search by Student ID or Student Name",
  searchKeys: ["studentId", "studentName"],
  seedRecords: enrollments,
  summary: [
    { label: "Total Enrollments", value: "2,180" },
    { label: "Fully Enrolled", value: "1,950" },
    { label: "Pending", value: "150" },
    { label: "Not Enrolled", value: "80" },
  ],
  fields: [
    { name: "enrollmentId", label: "Enrollment ID", type: "text", required: true },
    { name: "studentId", label: "Student ID", type: "text", required: true },
    { name: "studentName", label: "Student Name", type: "text", required: true },
    {
      name: "course",
      label: "Course",
      type: "select",
      options: courses,
      required: true,
    },
    {
      name: "academicYear",
      label: "Academic Year",
      type: "select",
      options: ["2025-2026", "2026-2027"],
      required: true,
    },
    {
      name: "semester",
      label: "Semester",
      type: "select",
      options: ["1st Semester", "2nd Semester", "Summer"],
      required: true,
    },
    {
      name: "enrollmentDate",
      label: "Enrollment Date",
      type: "date",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Fully Enrolled", "Pending", "Not Enrolled"],
      required: true,
    },
  ],
  columns: [
    { key: "enrollmentId", label: "Enrollment ID" },
    { key: "studentId", label: "Student ID" },
    { key: "studentName", label: "Student Name" },
    { key: "course", label: "Course" },
    { key: "academicYear", label: "Academic Year" },
    { key: "semester", label: "Semester" },
    { key: "enrollmentDate", label: "Enrollment Date" },
    { key: "status", label: "Status" },
  ],
  filters: [
    {
      key: "academicYear",
      label: "Academic year",
      allLabel: "All academic years",
      options: ["2025-2026", "2026-2027"],
    },
    {
      key: "semester",
      label: "Semester",
      allLabel: "All semesters",
      options: ["1st Semester", "2nd Semester", "Summer"],
    },
    {
      key: "status",
      label: "Enrollment status",
      allLabel: "All statuses",
      options: ["Fully Enrolled", "Pending", "Not Enrolled"],
    },
  ],
  statusField: "status",
  statusVariants: {
    "Fully Enrolled": "success",
    Pending: "warning",
    "Not Enrolled": "neutral",
  },
  validate(values, records, editingId) {
    const errors: Record<string, string> = {};
    const duplicate = records.some(
      (record) =>
        record.id !== editingId &&
        record.enrollmentId.toLowerCase() ===
          values.enrollmentId.toLowerCase(),
    );
    if (duplicate) errors.enrollmentId = "This Enrollment ID is already in use.";
    return errors;
  },
};

const academicRecords = [
  {
    id: "academic-1",
    studentId: "UC-2023-0142",
    studentName: "Amara Santos",
    course: "Computer Science",
    yearLevel: "3rd Year",
    gpa: "3.78",
    completedUnits: "84",
    academicStanding: "Good Standing",
  },
  {
    id: "academic-2",
    studentId: "UC-2022-0087",
    studentName: "Noah Reyes",
    course: "Business Administration",
    yearLevel: "4th Year",
    gpa: "3.42",
    completedUnits: "108",
    academicStanding: "Good Standing",
  },
  {
    id: "academic-3",
    studentId: "UC-2024-0261",
    studentName: "Mikaela Cruz",
    course: "Nursing",
    yearLevel: "2nd Year",
    gpa: "2.61",
    completedUnits: "42",
    academicStanding: "At Risk",
  },
  {
    id: "academic-4",
    studentId: "UC-2021-0035",
    studentName: "Ethan Lim",
    course: "Information Technology",
    yearLevel: "5th Year",
    gpa: "2.94",
    completedUnits: "116",
    academicStanding: "Incomplete",
  },
  {
    id: "academic-5",
    studentId: "UC-2023-0198",
    studentName: "Sofia Mendoza",
    course: "Psychology",
    yearLevel: "3rd Year",
    gpa: "3.65",
    completedUnits: "78",
    academicStanding: "Good Standing",
  },
  {
    id: "academic-6",
    studentId: "UC-2025-0314",
    studentName: "Lucas Navarro",
    course: "Civil Engineering",
    yearLevel: "1st Year",
    gpa: "3.08",
    completedUnits: "24",
    academicStanding: "Good Standing",
  },
  {
    id: "academic-7",
    studentId: "UC-2022-0116",
    studentName: "Isabel Flores",
    course: "Computer Science",
    yearLevel: "4th Year",
    gpa: "2.48",
    completedUnits: "91",
    academicStanding: "At Risk",
  },
  {
    id: "academic-8",
    studentId: "UC-2024-0229",
    studentName: "Gabriel Dela Cruz",
    course: "Business Administration",
    yearLevel: "2nd Year",
    gpa: "3.12",
    completedUnits: "48",
    academicStanding: "Incomplete",
  },
];

export const academicRecordsConfig: AdminRecordsConfig = {
  title: "Academic Records",
  description: "View and manage student academic performance records.",
  recordName: "academic record",
  searchPlaceholder: "Search by Student ID or Student Name",
  searchKeys: ["studentId", "studentName"],
  seedRecords: academicRecords,
  summary: [
    { label: "Total Records", value: "2,180" },
    { label: "Good Academic Standing", value: "1,850" },
    { label: "At Risk", value: "230" },
    { label: "Incomplete Records", value: "100" },
  ],
  fields: [
    { name: "studentId", label: "Student ID", type: "text", required: true },
    { name: "studentName", label: "Student Name", type: "text", required: true },
    {
      name: "course",
      label: "Course",
      type: "select",
      options: courses,
      required: true,
    },
    {
      name: "yearLevel",
      label: "Year Level",
      type: "select",
      options: yearLevels,
      required: true,
    },
    {
      name: "gpa",
      label: "GPA (4.00 scale)",
      type: "number",
      min: 0,
      max: 4,
      step: 0.01,
      required: true,
    },
    {
      name: "completedUnits",
      label: "Completed Units",
      type: "number",
      min: 0,
      step: 1,
      required: true,
    },
    {
      name: "academicStanding",
      label: "Academic Standing",
      type: "select",
      options: ["Good Standing", "At Risk", "Incomplete"],
      required: true,
    },
  ],
  columns: [
    { key: "studentId", label: "Student ID" },
    { key: "studentName", label: "Student Name" },
    { key: "course", label: "Course" },
    { key: "yearLevel", label: "Year Level" },
    { key: "gpa", label: "GPA" },
    { key: "completedUnits", label: "Completed Units" },
    { key: "academicStanding", label: "Academic Standing" },
  ],
  filters: [
    { key: "course", label: "Course", allLabel: "All courses", options: courses },
    {
      key: "yearLevel",
      label: "Year level",
      allLabel: "All year levels",
      options: yearLevels,
    },
    {
      key: "academicStanding",
      label: "Academic standing",
      allLabel: "All standings",
      options: ["Good Standing", "At Risk", "Incomplete"],
    },
  ],
  statusField: "academicStanding",
  statusVariants: {
    "Good Standing": "success",
    "At Risk": "warning",
    Incomplete: "error",
  },
  validate(values) {
    const errors: Record<string, string> = {};
    const gpa = Number(values.gpa);
    const completedUnits = Number(values.completedUnits);
    if (!Number.isFinite(gpa) || gpa < 0 || gpa > 4) {
      errors.gpa = "Enter a GPA from 0.00 to 4.00.";
    }
    if (!Number.isInteger(completedUnits) || completedUnits < 0) {
      errors.completedUnits = "Enter a whole number of 0 or more.";
    }
    return errors;
  },
};
