"use client";

import { RecordManagement } from "@/components/admin/RecordManagement";
import { studentRecordsConfig } from "@/data/admin-records";

export default function AdminStudentsPage() {
  return <RecordManagement config={studentRecordsConfig} />;
}
