export const dashboardMetrics = [
  { id: "totalStudents", label: "Total Students", value: "2,450" },
  { id: "enrolledStudents", label: "Enrolled Students", value: "2,180" },
  { id: "activeCourses", label: "Active Courses", value: "86" },
  {
    id: "libraryTransactions",
    label: "Library Transactions",
    value: "1,320",
  },
] as const;

export const enrollmentOverview = [
  { month: "Jan", students: 326 },
  { month: "Feb", students: 354 },
  { month: "Mar", students: 372 },
  { month: "Apr", students: 389 },
  { month: "May", students: 421 },
  { month: "Jun", students: 448 },
] as const;

export const recentActivities = [
  {
    id: "student-record",
    type: "student",
    title: "New student record added",
    description: "A sample record was added to the student information dataset.",
    date: "Today · 9:42 AM",
  },
  {
    id: "enrollment-record",
    type: "enrollment",
    title: "Enrollment record updated",
    description: "A demonstration enrollment record was updated.",
    date: "Today · 9:18 AM",
  },
  {
    id: "library-transaction",
    type: "library",
    title: "Library transaction recorded",
    description: "A sample transaction was added to the activity feed.",
    date: "Yesterday · 4:32 PM",
  },
  {
    id: "academic-record",
    type: "academics",
    title: "Student academic record updated",
    description: "A demonstration academic record was refreshed.",
    date: "Nov 17 · 2:06 PM",
  },
] as const;

export const dataSourceStatuses = [
  {
    id: "sis",
    name: "Student Information System (SIS)",
    status: "Connected",
  },
  {
    id: "lms",
    name: "Learning Management System (LMS)",
    status: "Connected",
  },
  {
    id: "library",
    name: "Library Management System",
    status: "Synchronization Pending",
  },
] as const;
