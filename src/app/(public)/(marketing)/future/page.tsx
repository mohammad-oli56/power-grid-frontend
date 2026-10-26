
import React from "react";

const schedules = [
  {
    area: "Mirpur - Section 10",
    zone: "Zone A",
    date: "26 Oct 2026",
    time: "10:00 AM - 12:00 PM",
    duration: "2 hours",
    status: "Upcoming",
  },
  {
    area: "Dhanmondi - Road 27",
    zone: "Zone B",
    date: "26 Oct 2026",
    time: "1:00 PM - 3:00 PM",
    duration: "2 hours",
    status: "Upcoming",
  },
  {
    area: "Uttara - Sector 7",
    zone: "Zone C",
    date: "27 Oct 2026",
    time: "9:00 AM - 11:00 AM",
    duration: "2 hours",
    status: "Scheduled",
  },
  {
    area: "Mohammadpur - Town Hall",
    zone: "Zone D",
    date: "27 Oct 2026",
    time: "3:00 PM - 4:30 PM",
    duration: "1.5 hours",
    status: "Scheduled",
  },
];

const stats = [
  {
    label: "Upcoming Schedules",
    value: "12",
    icon: "📅",
    color: "bg-blue-50 text-blue-600",
    trend: "Plan ahead",
  },
  {
    label: "Areas Covered",
    value: "08",
    icon: "📍",
    color: "bg-emerald-50 text-emerald-600",
    trend: "Across service zones",
  },
  {
    label: "Active Outages",
    value: "03",
    icon: "⚡",
    color: "bg-amber-50 text-amber-600",
    trend: "Being monitored",
  },
  {
    label: "Resolved Today",
    value: "18",
    icon: "✓",
    color: "bg-purple-50 text-purple-600",
    trend: "Restoration updates",
  },
];

const Future = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <span>⚡</span>
              PowerCare
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Overview</span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Future Power Schedules
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Stay prepared with upcoming load shedding schedules and outage updates.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="hidden rounded-xl border border-slate-200 px-4 py-2 sm:block">
              <p className="text-xs text-slate-500">Today</p>
              <p className="text-sm font-bold text-slate-800">
                October 25, 2026
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-9">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 right-36 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
              POWER SCHEDULE CENTER
            </span>
            <h2 className="mt-5 text-2xl font-extrabold leading-tight sm:text-4xl">
              Plan Your Day.
              <br />
              Stay One Step Ahead.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
              Check planned power interruptions in your area, prepare for
              scheduled outages, and stay updated on restoration activities.
            </p>

            <a
              href="#schedules"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-emerald-700 transition hover:bg-emerald-50"
            >
              View Upcoming Schedules <span>→</span>
            </a>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3 sm:absolute sm:bottom-8 sm:right-8 sm:mt-0 sm:justify-end">
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs text-emerald-100">Next 24 hours</p>
              <p className="mt-1 text-xl font-extrabold">04 Schedules</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-extrabold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${stat.color}`}
                >
                  {stat.icon}
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-slate-500">
                {stat.trend}
              </p>
            </article>
          ))}
        </section>

        {/* Schedule Section */}
        <section id="schedules" className="space-y-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Schedule Overview
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                Upcoming Power Interruptions
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Example schedule data for demonstration purposes.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              4 schedules listed
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-semibold">Service Area</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Time</th>
                    <th className="px-6 py-4 font-semibold">Duration</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedules.map((schedule) => (
                    <tr
                      key={schedule.area}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                            📍
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">
                              {schedule.area}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {schedule.zone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {schedule.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-slate-700">
                        {schedule.time}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {schedule.duration}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            schedule.status === "Upcoming"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {schedule.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {schedules.map((schedule) => (
              <article
                key={schedule.area}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                      📍
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {schedule.area}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {schedule.zone}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    {schedule.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {schedule.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {schedule.duration}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500">Scheduled Time</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {schedule.time}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Notice */}
        <section className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl">
            💡
          </div>
          <div>
            <h3 className="font-bold text-amber-900">Stay Prepared</h3>
            <p className="mt-2 text-sm leading-6 text-amber-800">
              Save important work before a planned interruption, charge your
              essential devices, and check official schedule updates regularly.
              The schedules and statistics shown here are static demo data,
              not verified live outage information.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 PowerCare · Load Shedding & Power Outage Management System
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Future;
