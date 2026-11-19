"use client";

import { RecordManagement } from "@/components/admin/RecordManagement";
import { enrollmentRecordsConfig } from "@/data/admin-records";

export default function AdminEnrollmentPage() {
  return <RecordManagement config={enrollmentRecordsConfig} />;
}
