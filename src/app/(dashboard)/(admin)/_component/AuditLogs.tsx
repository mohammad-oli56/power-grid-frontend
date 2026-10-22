"use client";

import React, { useState } from "react";
import { useGetAllAuditLogs } from "@/hooks/admin.hooks";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  RefreshCw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AuditLogs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isPending, isError, isFetching, refetch } =
    useGetAllAuditLogs(page);

  const logs = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const totalPages = meta?.totalPages ?? 1;
  const totalLogs = meta?.total ?? 0;

  const filteredLogs = logs.filter((log: any) => {
    const query = search.toLowerCase();

    return (
      log.action?.toLowerCase().includes(query) ||
      log.author_role?.toLowerCase().includes(query) ||
      log.entityType?.toLowerCase().includes(query) ||
      log.userId?.toLowerCase().includes(query) ||
      log.entityId?.toLowerCase().includes(query)
    );
  });

  const getActionStyle = (action: string) => {
    if (action?.startsWith("CREATE")) {
      return "bg-green-100 text-green-700";
    }
    if (action?.startsWith("DELETE")) {
      return "bg-red-100 text-red-700";
    }
    if (action?.startsWith("UPDATE")) {
      return "bg-blue-100 text-blue-700";
    }
    if (action?.startsWith("CANCEL")) {
      return "bg-orange-100 text-orange-700";
    }
    if (action?.startsWith("ASSIGN")) {
      return "bg-purple-100 text-purple-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Loading audit logs...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-600">
          Failed to load audit logs.
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-7 w-7 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Audit Logs
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Track and review administrative activities.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Total Audit Logs
        </p>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {totalLogs}
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search current page..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Action</th>
                <th className="px-6 py-4 font-semibold">Author Role</th>
                <th className="px-6 py-4 font-semibold">Entity Type</th>
                <th className="px-6 py-4 font-semibold">User ID</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log: any) => (
                  <tr
                    key={log.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getActionStyle(log.action)}`}
                      >
                        {log.action?.replaceAll("_", " ") ?? "UNKNOWN"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        {log.author_role?.replaceAll("_", " ") ?? "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700">
                      {log.entityType ?? "N/A"}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {log.userId ?? "N/A"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {log.createdAt
                        ? new Date(log.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {search
                      ? "No audit logs match your search on this page."
                      : "No audit logs found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-gray-500">
            Page <span className="font-semibold text-gray-900">{page}</span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {totalPages}
            </span>{" "}
            <span className="mx-1">·</span>
            {totalLogs} total logs
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            <Button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1 || isFetching}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  disabled={isFetching}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors disabled:opacity-50 ${
                    page === pageNumber
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </Button>
              ),
            )}

            <Button
              onClick={() =>
                setPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={page >= totalPages || isFetching}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isFetching && (
          <div className="h-1 w-full overflow-hidden bg-gray-100">
            <div className="h-full w-1/3 animate-pulse rounded bg-indigo-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;