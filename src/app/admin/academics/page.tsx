"use client";

import { RecordManagement } from "@/components/admin/RecordManagement";
import { academicRecordsConfig } from "@/data/admin-records";

export default function AdminAcademicsPage() {
  return <RecordManagement config={academicRecordsConfig} />;
}
