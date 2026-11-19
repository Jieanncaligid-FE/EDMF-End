"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { RecordManagement } from "@/components/admin/RecordManagement";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  libraryBooksConfig,
  libraryBorrowingActivities,
} from "@/data/admin-library";

const borrowingStatusVariants = {
  Borrowed: "warning",
  Returned: "success",
  Overdue: "error",
} as const;

function BorrowingActivity() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const activities = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return libraryBorrowingActivities.filter((activity) => {
      const matchesSearch =
        !normalizedQuery ||
        [
          activity.transactionId,
          activity.studentId,
          activity.studentName,
          activity.bookTitle,
        ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
      return (
        matchesSearch && (!statusFilter || activity.status === statusFilter)
      );
    });
  }, [query, statusFilter]);

  return (
    <Card className="space-y-4 p-4 sm:p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl">Borrowing Activity</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Fictional demonstration loans and returns
          </p>
        </div>
        <Badge variant="neutral">Demo transactions</Badge>
      </header>

      <div className="grid gap-4 sm:grid-cols-[minmax(16rem,1fr)_minmax(12rem,0.4fr)]">
        <label className="relative min-w-0">
          <span className="sr-only">
            Search borrowing transactions by ID, student, or book
          </span>
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={17}
          />
          <input
            className="uc-input pl-10"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search transactions, students, or books"
            type="search"
            value={query}
          />
        </label>
        <label className="uc-field">
          <span className="uc-field__label">Return status</span>
          <select
            aria-label="Return status"
            className="uc-input"
            onChange={(event) => setStatusFilter(event.target.value)}
            value={statusFilter}
          >
            <option value="">All statuses</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>
      </div>

      <p aria-live="polite" className="text-sm text-zinc-600">
        Showing {activities.length} demonstration{" "}
        {activities.length === 1 ? "transaction" : "transactions"}
      </p>

      <div className="-mx-4 overflow-x-auto sm:mx-0">
        <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              {[
                "Transaction ID",
                "Student ID",
                "Student Name",
                "Book Title",
                "Borrow Date",
                "Due Date",
                "Return Status",
              ].map((column) => (
                <th
                  className="border-y border-border px-4 py-3 font-semibold"
                  key={column}
                  scope="col"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {activities.map((activity) => (
              <tr className="bg-white" key={activity.transactionId}>
                <td className="px-4 py-3.5 font-mono text-xs text-zinc-700">
                  {activity.transactionId}
                </td>
                <td className="px-4 py-3.5 text-zinc-700">
                  {activity.studentId}
                </td>
                <td className="px-4 py-3.5 text-zinc-700">
                  {activity.studentName}
                </td>
                <td className="max-w-64 px-4 py-3.5 text-zinc-700">
                  {activity.bookTitle}
                </td>
                <td className="px-4 py-3.5 text-zinc-700">
                  {activity.borrowDate}
                </td>
                <td className="px-4 py-3.5 text-zinc-700">
                  {activity.dueDate}
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={borrowingStatusVariants[activity.status]}>
                    {activity.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {activities.length === 0 && (
              <tr>
                <td
                  className="px-4 py-12 text-center text-zinc-500"
                  colSpan={7}
                >
                  No borrowing transactions match your search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function AdminLibraryPage() {
  return (
    <div className="space-y-6">
      <RecordManagement config={libraryBooksConfig} />
      <BorrowingActivity />
    </div>
  );
}
