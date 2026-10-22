"use client";

import React from "react";
import {
  Users,
  Search,
  Mail,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetAllUsers } from "../../../../hooks/admin.hooks";

const PAGE_SIZE = 10;

const Allusers = () => {
  const { data, isPending, isError } = useGetAllUsers();

  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  // API response: data.data.data
  const users = data?.data?.data ?? [];

  // Search all users returned by the API
  const filteredUsers = users.filter((user: any) => {
    const query = search.trim().toLowerCase();

    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query) ||
      user.status?.toLowerCase().includes(query)
    );
  });

  // Reset to page 1 when search changes

  // Calculate pagination
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const getRoleStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-50 text-purple-700";

      case "power_operator":
      case "power operator":
        return "bg-blue-50 text-blue-700";

      case "technician":
        return "bg-amber-50 text-amber-700";

      case "customer":
        return "bg-indigo-50 text-indigo-700";

      default:
        return "bg-violet-50 text-violet-700";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700";

      case "blocked":
        return "bg-red-50 text-red-700";

      case "deleted":
        return "bg-slate-100 text-slate-600";

      case "inactive":
        return "bg-amber-50 text-amber-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        Failed to load users. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            All Users
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and view all registered users.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <Users size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-500">Total Users</p>

            <p className="text-xl font-bold text-slate-900">{users.length}</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              User Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {totalUsers} users found
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search name, email, or role..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.map((user: any) => {
                const role = String(user.role ?? "N/A");
                const status = String(user.status ?? "Unknown");

                return (
                  <tr key={user.id} className="transition hover:bg-slate-50/80">
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold uppercase text-blue-700">
                          {user.name?.charAt(0) || "U"}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {user.name || "Unknown"}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            User account
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={15} className="shrink-0 text-slate-400" />
                        {user.email || "N/A"}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getRoleStyle(role)}`}
                      >
                        <ShieldCheck size={14} />

                        {role.replace(/_/g, " ").toLowerCase()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(status)}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {status.replace(/_/g, " ").toLowerCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Users size={24} />
                    </div>

                    <p className="mt-3 font-semibold text-slate-700">
                      No users found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try another name, email, or role.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {totalUsers === 0 ? 0 : startIndex + 1}
              {" - "}
              {Math.min(startIndex + PAGE_SIZE, totalUsers)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">{totalUsers}</span>{" "}
            users
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || totalPages === 0}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
