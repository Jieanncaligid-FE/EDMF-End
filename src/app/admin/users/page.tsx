"use client";

import { RecordManagement } from "@/components/admin/RecordManagement";
import { userManagementConfig } from "@/data/admin-users";

export default function AdminUsersPage() {
  return <RecordManagement config={userManagementConfig} />;
}
