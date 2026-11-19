import type { AdminRecord, AdminRecordsConfig } from "@/types/admin-record";

const categories = [
  "Reference",
  "Literature",
  "Science",
  "History",
  "Technology",
  "Arts",
];

const books: AdminRecord[] = [
  {
    id: "book-1",
    bookId: "LIB-00142",
    title: "Foundations of Computer Science",
    author: "Eleanor Park",
    category: "Technology",
    availableCopies: "18",
    totalCopies: "24",
    status: "Available",
  },
  {
    id: "book-2",
    bookId: "LIB-00208",
    title: "Principles of Microeconomics",
    author: "Marcus Bennett",
    category: "Reference",
    availableCopies: "7",
    totalCopies: "18",
    status: "Available",
  },
  {
    id: "book-3",
    bookId: "LIB-00317",
    title: "Anatomy for Health Sciences",
    author: "Priya Menon",
    category: "Science",
    availableCopies: "0",
    totalCopies: "16",
    status: "Borrowed",
  },
  {
    id: "book-4",
    bookId: "LIB-00403",
    title: "The Philippine History Reader",
    author: "Rafael Villanueva",
    category: "History",
    availableCopies: "11",
    totalCopies: "14",
    status: "Available",
  },
  {
    id: "book-5",
    bookId: "LIB-00526",
    title: "Modern Literary Perspectives",
    author: "Clara West",
    category: "Literature",
    availableCopies: "4",
    totalCopies: "12",
    status: "Available",
  },
  {
    id: "book-6",
    bookId: "LIB-00631",
    title: "Studio Art: Form and Practice",
    author: "Daniel Okafor",
    category: "Arts",
    availableCopies: "0",
    totalCopies: "8",
    status: "Unavailable",
  },
  {
    id: "book-7",
    bookId: "LIB-00715",
    title: "Data Structures in Practice",
    author: "Mei Chen",
    category: "Technology",
    availableCopies: "9",
    totalCopies: "15",
    status: "Available",
  },
  {
    id: "book-8",
    bookId: "LIB-00849",
    title: "Research Methods Across Disciplines",
    author: "Samuel Ortiz",
    category: "Reference",
    availableCopies: "2",
    totalCopies: "10",
    status: "Available",
  },
];

export const libraryBooksConfig: AdminRecordsConfig = {
  title: "Library Management",
  description: "Monitor library resources, borrowing activities, and returns.",
  recordName: "book",
  searchPlaceholder: "Search by book title, author, or Book ID",
  searchKeys: ["title", "author", "bookId"],
  seedRecords: books,
  summary: [
    { label: "Total Books", value: "5,240" },
    { label: "Available Books", value: "3,850" },
    { label: "Borrowed Books", value: "1,120" },
    { label: "Overdue Books", value: "270" },
  ],
  fields: [
    { name: "bookId", label: "Book ID", type: "text", required: true },
    { name: "title", label: "Book Title", type: "text", required: true },
    { name: "author", label: "Author", type: "text", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories,
      required: true,
    },
    {
      name: "availableCopies",
      label: "Available Copies",
      type: "number",
      min: 0,
      step: 1,
      required: true,
    },
    {
      name: "totalCopies",
      label: "Total Copies",
      type: "number",
      min: 1,
      step: 1,
      required: true,
    },
    {
      name: "status",
      label: "Availability Status",
      type: "select",
      options: ["Available", "Borrowed", "Unavailable"],
      required: true,
    },
  ],
  columns: [
    { key: "bookId", label: "Book ID" },
    { key: "title", label: "Book Title" },
    { key: "author", label: "Author" },
    { key: "category", label: "Category" },
    { key: "availableCopies", label: "Available Copies" },
    { key: "totalCopies", label: "Total Copies" },
    { key: "status", label: "Status" },
  ],
  filters: [
    {
      key: "category",
      label: "Category",
      allLabel: "All categories",
      options: categories,
    },
    {
      key: "status",
      label: "Availability status",
      allLabel: "All statuses",
      options: ["Available", "Borrowed", "Unavailable"],
    },
  ],
  statusField: "status",
  statusVariants: {
    Available: "success",
    Borrowed: "warning",
    Unavailable: "neutral",
  },
  validate(values, records, editingId) {
    const errors: Record<string, string> = {};
    const duplicate = records.some(
      (record) =>
        record.id !== editingId &&
        record.bookId.toLowerCase() === values.bookId.toLowerCase(),
    );
    if (duplicate) errors.bookId = "This Book ID is already in use.";

    const availableCopies = Number(values.availableCopies);
    const totalCopies = Number(values.totalCopies);
    if (!Number.isInteger(availableCopies) || availableCopies < 0) {
      errors.availableCopies = "Enter a whole number of 0 or more.";
    }
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      errors.totalCopies = "Enter a whole number of 1 or more.";
    } else if (availableCopies > totalCopies) {
      errors.availableCopies =
        "Available copies cannot exceed the total number of copies.";
    }
    return errors;
  },
};

export const libraryBorrowingActivities = [
  {
    transactionId: "TX-2026-0814",
    studentId: "UC-2023-0142",
    studentName: "Amara Santos",
    bookTitle: "Foundations of Computer Science",
    borrowDate: "2026-11-12",
    dueDate: "2026-11-26",
    status: "Borrowed",
  },
  {
    transactionId: "TX-2026-0811",
    studentId: "UC-2024-0261",
    studentName: "Mikaela Cruz",
    bookTitle: "Anatomy for Health Sciences",
    borrowDate: "2026-10-28",
    dueDate: "2026-11-11",
    status: "Overdue",
  },
  {
    transactionId: "TX-2026-0806",
    studentId: "UC-2022-0087",
    studentName: "Noah Reyes",
    bookTitle: "Principles of Microeconomics",
    borrowDate: "2026-11-02",
    dueDate: "2026-11-16",
    status: "Returned",
  },
  {
    transactionId: "TX-2026-0799",
    studentId: "UC-2023-0198",
    studentName: "Sofia Mendoza",
    bookTitle: "Modern Literary Perspectives",
    borrowDate: "2026-11-05",
    dueDate: "2026-11-19",
    status: "Borrowed",
  },
  {
    transactionId: "TX-2026-0792",
    studentId: "UC-2025-0314",
    studentName: "Lucas Navarro",
    bookTitle: "The Philippine History Reader",
    borrowDate: "2026-10-21",
    dueDate: "2026-11-04",
    status: "Overdue",
  },
  {
    transactionId: "TX-2026-0785",
    studentId: "UC-2022-0116",
    studentName: "Isabel Flores",
    bookTitle: "Data Structures in Practice",
    borrowDate: "2026-10-18",
    dueDate: "2026-11-01",
    status: "Returned",
  },
  {
    transactionId: "TX-2026-0778",
    studentId: "UC-2024-0229",
    studentName: "Gabriel Dela Cruz",
    bookTitle: "Research Methods Across Disciplines",
    borrowDate: "2026-11-10",
    dueDate: "2026-11-24",
    status: "Borrowed",
  },
] as const;
