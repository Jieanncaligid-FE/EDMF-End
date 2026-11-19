export type AdminRecord = {
  id: string;
  [key: string]: string;
};

export type AdminRecordFieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "select";

export interface AdminRecordField {
  name: string;
  label: string;
  type: AdminRecordFieldType;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface AdminRecordColumn {
  key: string;
  label: string;
}

export interface AdminRecordFilter {
  key: string;
  label: string;
  allLabel: string;
  options: string[];
}

export interface AdminRecordSummary {
  label: string;
  value: string;
}

export interface AdminRecordsConfig {
  title: string;
  description: string;
  recordName: string;
  searchPlaceholder: string;
  searchKeys: string[];
  seedRecords: AdminRecord[];
  summary: AdminRecordSummary[];
  demonstrationNote?: string;
  fields: AdminRecordField[];
  columns: AdminRecordColumn[];
  filters: AdminRecordFilter[];
  statusField: string;
  statusVariants: Record<string, "success" | "warning" | "error" | "neutral">;
  statusToggle?: {
    field: string;
    activeValue: string;
    inactiveValue: string;
  };
  validate?: (
    values: Record<string, string>,
    records: AdminRecord[],
    editingId?: string,
  ) => Record<string, string>;
}
