import type { AdminRecord, AdminRecordsConfig } from "@/types/admin-record";

const userRecords: AdminRecord[] = [
  {
    id: "user-001",
    userId: "UC-ADM-0001",
    fullName: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Administrator",
    accountStatus: "Active",
    dateCreated: "2025-08-12",
  },
  {
    id: "user-002",
    userId: "UC-FAC-0032",
    fullName: "Jordan Lee",
    email: "jordan.lee@example.com",
    role: "Faculty",
    accountStatus: "Active",
    dateCreated: "2025-09-04",
  },
  {
    id: "user-003",
    userId: "UC-STU-0142",
    fullName: "Amara Santos",
    email: "amara.santos@example.com",
    role: "Student",
    accountStatus: "Active",
    dateCreated: "2025-10-18",
  },
  {
    id: "user-004",
    userId: "UC-FAC-0041",
    fullName: "Taylor Rivera",
    email: "taylor.rivera@example.com",
    role: "Faculty",
    accountStatus: "Inactive",
    dateCreated: "2025-11-02",
  },
  {
    id: "user-005",
    userId: "UC-STU-0261",
    fullName: "Mikaela Cruz",
    email: "mikaela.cruz@example.com",
    role: "Student",
    accountStatus: "Active",
    dateCreated: "2026-01-15",
  },
  {
    id: "user-006",
    userId: "UC-ADM-0002",
    fullName: "Casey Bennett",
    email: "casey.bennett@example.com",
    role: "Administrator",
    accountStatus: "Active",
    dateCreated: "2026-02-08",
  },
  {
    id: "user-007",
    userId: "UC-STU-0229",
    fullName: "Gabriel Dela Cruz",
    email: "gabriel.delacruz@example.com",
    role: "Student",
    accountStatus: "Inactive",
    dateCreated: "2026-04-23",
  },
  {
    id: "user-008",
    userId: "UC-FAC-0055",
    fullName: "Morgan Ellis",
    email: "morgan.ellis@example.com",
    role: "Faculty",
    accountStatus: "Active",
    dateCreated: "2026-06-11",
  },
];

export const userManagementConfig: AdminRecordsConfig = {
  title: "User Management",
  description: "Manage system users, roles, and account access.",
  recordName: "user",
  searchPlaceholder: "Search by name or email",
  searchKeys: ["fullName", "email"],
  seedRecords: userRecords,
  summary: [
    { label: "Total Users", value: "125" },
    { label: "Administrators", value: "8" },
    { label: "Faculty Members", value: "32" },
    { label: "Students", value: "85" },
  ],
  demonstrationNote:
    "Public registration remains limited to student accounts. Administrator roles shown here are frontend demonstration data only.",
  fields: [
    { name: "userId", label: "User ID", type: "text", required: true },
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Administrator", "Faculty", "Student"],
      required: true,
    },
    {
      name: "accountStatus",
      label: "Account Status",
      type: "select",
      options: ["Active", "Inactive"],
      required: true,
    },
    {
      name: "dateCreated",
      label: "Date Created",
      type: "date",
      required: true,
    },
  ],
  columns: [
    { key: "userId", label: "User ID" },
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "accountStatus", label: "Account Status" },
    { key: "dateCreated", label: "Date Created" },
  ],
  filters: [
    {
      key: "role",
      label: "Role",
      allLabel: "All roles",
      options: ["Administrator", "Faculty", "Student"],
    },
    {
      key: "accountStatus",
      label: "Account status",
      allLabel: "All statuses",
      options: ["Active", "Inactive"],
    },
  ],
  statusField: "accountStatus",
  statusVariants: { Active: "success", Inactive: "neutral" },
  statusToggle: {
    field: "accountStatus",
    activeValue: "Active",
    inactiveValue: "Inactive",
  },
  validate(values, records, editingId) {
    const errors: Record<string, string> = {};
    for (const field of ["userId", "email"] as const) {
      if (
        records.some(
          (record) =>
            record.id !== editingId &&
            record[field].toLocaleLowerCase() ===
              values[field].trim().toLocaleLowerCase(),
        )
      ) {
        errors[field] =
          field === "userId"
            ? "This User ID is already in use."
            : "This email address is already in use.";
      }
    }
    return errors;
  },
};
