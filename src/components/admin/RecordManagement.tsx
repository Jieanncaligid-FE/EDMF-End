"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  Eye,
  FilePlus2,
  Pencil,
  Power,
  Search,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import type {
  AdminRecord,
  AdminRecordsConfig,
} from "@/types/admin-record";

type ActiveDialog =
  | { mode: "add" }
  | { mode: "edit"; record: AdminRecord }
  | { mode: "view"; record: AdminRecord };

const pageSizeOptions = [5, 10, 20];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formId = "admin-record-form";

function createBlankValues(config: AdminRecordsConfig) {
  return config.fields.reduce<Record<string, string>>((values, field) => {
    values[field.name] = "";
    return values;
  }, {});
}

function createRecordId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  );
}

function getDisplayValue(key: string, value: string) {
  if (key === "gpa" && value !== "" && Number.isFinite(Number(value))) {
    return `${Number(value).toFixed(2)} / 4.00`;
  }
  return value || "—";
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toLocaleUpperCase());
}

export function RecordManagement({
  config,
}: {
  config: AdminRecordsConfig;
}) {
  const [records, setRecords] = useState<AdminRecord[]>(config.seedRecords);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDialog, setActiveDialog] = useState<ActiveDialog | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return records.filter((record) => {
      const matchesSearch =
        !normalizedQuery ||
        config.searchKeys.some((key) =>
          (record[key] ?? "").toLocaleLowerCase().includes(normalizedQuery),
        );
      const matchesFilters = config.filters.every(
        (filter) => !filters[filter.key] || record[filter.key] === filters[filter.key],
      );
      return matchesSearch && matchesFilters;
    });
  }, [config.filters, config.searchKeys, filters, query, records]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const visiblePage = Math.min(currentPage, totalPages);
  const visibleRecords = filteredRecords.slice(
    (visiblePage - 1) * pageSize,
    visiblePage * pageSize,
  );
  const firstVisible = filteredRecords.length
    ? (visiblePage - 1) * pageSize + 1
    : 0;
  const lastVisible = Math.min(visiblePage * pageSize, filteredRecords.length);

  function closeDialog() {
    setActiveDialog(null);
    setFormErrors({});
  }

  function openAddDialog() {
    setFormValues(createBlankValues(config));
    setFormErrors({});
    setFeedback("");
    setActiveDialog({ mode: "add" });
  }

  function openEditDialog(record: AdminRecord) {
    setFormValues(
      config.fields.reduce<Record<string, string>>((values, field) => {
        values[field.name] = record[field.name] ?? "";
        return values;
      }, {}),
    );
    setFormErrors({});
    setFeedback("");
    setActiveDialog({ mode: "edit", record });
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeDialog || activeDialog.mode === "view") return;

    const errors: Record<string, string> = {};
    for (const field of config.fields) {
      const value = formValues[field.name] ?? "";
      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} is required.`;
      } else if (field.type === "email" && value && !emailPattern.test(value)) {
        errors[field.name] = "Enter a valid email address.";
      } else if (field.type === "number" && value) {
        const numericValue = Number(value);
        if (
          !Number.isFinite(numericValue) ||
          (field.min !== undefined && numericValue < field.min) ||
          (field.max !== undefined && numericValue > field.max)
        ) {
          errors[field.name] =
            field.min !== undefined && field.max !== undefined
              ? `Enter a value from ${field.min} to ${field.max}.`
              : `Enter a value of at least ${field.min ?? field.max}.`;
        }
      }
    }

    const editingId = activeDialog.mode === "edit" ? activeDialog.record.id : undefined;
    Object.assign(
      errors,
      config.validate?.(formValues, records, editingId) ?? {},
    );
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const updatedRecord: AdminRecord = {
      ...formValues,
      id: editingId ?? createRecordId(),
    };
    if (activeDialog.mode === "edit") {
      setRecords((current) =>
        current.map((record) =>
          record.id === activeDialog.record.id ? updatedRecord : record,
        ),
      );
      setFeedback(`The ${config.recordName} was updated in the local demo list.`);
    } else {
      setRecords((current) => [updatedRecord, ...current]);
      setCurrentPage(1);
      setFeedback(`The ${config.recordName} was added to the local demo list.`);
    }
    closeDialog();
  }

  function deleteRecord(record: AdminRecord) {
    const label =
      record.title ??
      record.bookId ??
      record.fullName ??
      record.studentName ??
      record.enrollmentId ??
      record.studentId ??
      config.recordName;
    if (
      !window.confirm(
        `Delete ${label}? This only removes it from the local demonstration data.`,
      )
    ) {
      return;
    }
    setRecords((current) => current.filter((item) => item.id !== record.id));
    setFeedback(`The ${config.recordName} was removed from the local demo list.`);
  }

  function toggleRecordStatus(record: AdminRecord) {
    const toggle = config.statusToggle;
    if (!toggle) return;

    const nextStatus =
      record[toggle.field] === toggle.activeValue
        ? toggle.inactiveValue
        : toggle.activeValue;
    setRecords((current) =>
      current.map((item) =>
        item.id === record.id
          ? { ...item, [toggle.field]: nextStatus }
          : item,
      ),
    );
    setFeedback(
      `${record.fullName ?? config.recordName} was marked ${nextStatus.toLowerCase()} in the local demo list.`,
    );
  }

  const dialogTitle =
    activeDialog?.mode === "add"
      ? `Add ${titleCase(config.recordName)}`
      : activeDialog?.mode === "edit"
        ? `Edit ${titleCase(config.recordName)}`
        : `View ${titleCase(config.recordName)} details`;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl">{config.title}</h2>
          <p className="mt-2 text-sm text-zinc-600">{config.description}</p>
        </div>
        <Button onClick={openAddDialog}>
          <FilePlus2 aria-hidden="true" size={18} />
          Add {titleCase(config.recordName)}
        </Button>
      </header>

      <div
        className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-950"
        role="note"
      >
        <div>
          <p>
            Demonstration data only. Changes on this page update the local
            frontend list and are not saved to a database.
          </p>
          {config.demonstrationNote && (
            <p className="mt-1">{config.demonstrationNote}</p>
          )}
        </div>
      </div>

      {feedback && (
        <p
          aria-live="polite"
          className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          {feedback}
        </p>
      )}

      <section
        aria-label={`${config.title} demonstration summary`}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {config.summary.map((metric) => (
          <Card className="p-5" key={metric.label}>
            <p className="text-sm font-medium text-zinc-600">{metric.label}</p>
            <p className="mt-3 font-mono text-2xl font-semibold tabular-nums text-midnight">
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-zinc-500">Sample demonstration figure</p>
          </Card>
        ))}
      </section>

      <Card className="space-y-4 p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(16rem,1fr)_repeat(3,minmax(10rem,0.65fr))]">
          <label className="relative min-w-0">
            <span className="sr-only">{config.searchPlaceholder}</span>
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={17}
            />
            <input
              className="uc-input pl-10"
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder={config.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>

          {config.filters.map((filter) => (
            <label className="uc-field min-w-0" key={filter.key}>
              <span className="uc-field__label">{filter.label}</span>
              <select
                aria-label={filter.label}
                className="uc-input"
                onChange={(event) => {
                  setFilters((current) => ({
                    ...current,
                    [filter.key]: event.target.value,
                  }));
                  setCurrentPage(1);
                }}
                value={filters[filter.key] ?? ""}
              >
                <option value="">{filter.allLabel}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600">
          <p aria-live="polite">
            Showing {firstVisible}–{lastVisible} of {filteredRecords.length} records
          </p>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2" htmlFor="record-page-size">
              Rows
              <select
                className="uc-input min-h-9 w-20 py-1"
                id="record-page-size"
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setCurrentPage(1);
                }}
                value={pageSize}
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <Button
              disabled={visiblePage <= 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              variant="outline"
            >
              Previous
            </Button>
            <span aria-label={`Page ${visiblePage} of ${totalPages}`}>
              {visiblePage} / {totalPages}
            </span>
            <Button
              disabled={visiblePage >= totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>

        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                {config.columns.map((column) => (
                  <th className="border-y border-border px-4 py-3 font-semibold" key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
                <th className="border-y border-border px-4 py-3 text-right font-semibold" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleRecords.map((record) => {
                const rowLabel =
                  record.title ??
                  record.bookId ??
                  record.fullName ??
                  record.studentName ??
                  record.enrollmentId ??
                  record.studentId ??
                  config.recordName;

                return (
                  <tr className="bg-white" key={record.id}>
                    {config.columns.map((column) => {
                      const value = record[column.key] ?? "";
                      const isStatus = column.key === config.statusField;
                      return (
                        <td
                          className={`max-w-64 px-4 py-3.5 text-zinc-700 ${
                            column.key === "gpa" ? "font-mono font-semibold tabular-nums" : ""
                          }`}
                          key={column.key}
                        >
                          {isStatus ? (
                            <Badge
                              variant={config.statusVariants[value] ?? "neutral"}
                            >
                              {value}
                            </Badge>
                          ) : (
                            getDisplayValue(column.key, value)
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3.5">
                      <div className="flex justify-end gap-1">
                        {config.statusToggle && (
                          <button
                            aria-label={`${
                              record[config.statusToggle.field] ===
                              config.statusToggle.activeValue
                                ? "Deactivate"
                                : "Activate"
                            } account for ${rowLabel}`}
                            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-midnight"
                            onClick={() => toggleRecordStatus(record)}
                            title={
                              record[config.statusToggle.field] ===
                              config.statusToggle.activeValue
                                ? "Deactivate account"
                                : "Activate account"
                            }
                            type="button"
                          >
                            <Power aria-hidden="true" size={17} />
                          </button>
                        )}
                        <button
                          aria-label={`View ${rowLabel}`}
                          className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-midnight"
                          onClick={() =>
                            setActiveDialog({ mode: "view", record })
                          }
                          type="button"
                        >
                          <Eye aria-hidden="true" size={17} />
                        </button>
                        <button
                          aria-label={`Edit ${rowLabel}`}
                          className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-midnight"
                          onClick={() => openEditDialog(record)}
                          type="button"
                        >
                          <Pencil aria-hidden="true" size={17} />
                        </button>
                        <button
                          aria-label={`Delete ${rowLabel}`}
                          className="rounded-md p-2 text-zinc-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => deleteRecord(record)}
                          type="button"
                        >
                          <Trash2 aria-hidden="true" size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {visibleRecords.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-12 text-center text-zinc-500"
                    colSpan={config.columns.length + 1}
                  >
                    No records match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        footer={
          activeDialog?.mode === "view" ? (
            <Button onClick={closeDialog} variant="outline">
              Close
            </Button>
          ) : (
            <>
              <Button onClick={closeDialog} variant="outline">
                Cancel
              </Button>
              <Button form={formId} type="submit">
                {activeDialog?.mode === "edit" ? "Save changes" : "Add record"}
              </Button>
            </>
          )
        }
        onClose={closeDialog}
        open={activeDialog !== null}
        title={dialogTitle}
      >
        {activeDialog?.mode === "view" ? (
          <div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {config.fields.map((field) => {
                const value = activeDialog.record[field.name] ?? "";
                return (
                  <div className="min-w-0" key={field.name}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {field.label}
                    </dt>
                    <dd className="mt-1 break-words text-sm font-medium text-midnight">
                      {field.name === config.statusField ? (
                        <Badge
                          variant={config.statusVariants[value] ?? "neutral"}
                        >
                          {value}
                        </Badge>
                      ) : (
                        getDisplayValue(field.name, value)
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-5 text-xs text-zinc-500">
              Fictional demonstration record. Changes update only this page&apos;s
              local frontend state.
            </p>
          </div>
        ) : (
          <form
            className="space-y-4"
            id={formId}
            onSubmit={handleFormSubmit}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {config.fields.map((field) => {
                const error = formErrors[field.name];
                const inputId = `record-field-${field.name}`;
                if (field.type === "select") {
                  const errorId = `${inputId}-error`;
                  return (
                    <div className="uc-field" key={field.name}>
                      <label className="uc-field__label" htmlFor={inputId}>
                        {field.label}
                        {field.required && (
                          <span className="uc-field__required" aria-hidden="true">
                            *
                          </span>
                        )}
                      </label>
                      <select
                        aria-describedby={error ? errorId : undefined}
                        aria-invalid={error ? true : undefined}
                        className="uc-input"
                        id={inputId}
                        onChange={(event) => {
                          setFormValues((current) => ({
                            ...current,
                            [field.name]: event.target.value,
                          }));
                          setFormErrors((current) => ({
                            ...current,
                            [field.name]: "",
                          }));
                        }}
                        required={field.required}
                        value={formValues[field.name] ?? ""}
                      >
                        <option value="">Select {field.label.toLowerCase()}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {error && (
                        <span className="uc-field__error" id={errorId}>
                          {error}
                        </span>
                      )}
                    </div>
                  );
                }

                return (
                  <Input
                    error={error}
                    id={inputId}
                    key={field.name}
                    label={field.label}
                    max={field.max}
                    min={field.min}
                    onChange={(event) => {
                      setFormValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }));
                      setFormErrors((current) => ({
                        ...current,
                        [field.name]: "",
                      }));
                    }}
                    required={field.required}
                    step={field.step}
                    type={field.type}
                    value={formValues[field.name] ?? ""}
                  />
                );
              })}
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
