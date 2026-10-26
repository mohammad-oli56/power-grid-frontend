
import React from 'react';

const CustomerDashboard = () => {
  



  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Customer Portal / Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Customer Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/coustomer-dashboard/notification"
              aria-label="Notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl transition hover:bg-slate-50"
            >
              🔔
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </a>

          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-10">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-cyan-300/10 blur-2xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                POWERCARE CUSTOMER PORTAL
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                Welcome back, Customer! 👋
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-emerald-50">
                Stay informed about upcoming power interruptions, report
                outages, and manage your service requests—all in one place.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/coustomer-dashboard/schedule"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  View Schedules →
                </a>
                <a
                  href="/coustomer-dashboard/create-outage"
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  Report an Outage
                </a>
              </div>
            </div>

            <div className="hidden h-40 w-40 items-center justify-center rounded-full border border-white/20 bg-white/10 text-7xl md:flex">
              ⚡
            </div>
          </div>
        </section>

        {/* Status Cards */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Your Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick look at your power service activity.
              </p>
            </div>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              Demo Statistics
            </span>
          </div>

        </section>

        {/* Main Content */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Schedule Table */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Upcoming Power Schedules
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Planned interruptions for your area.
                </p>
              </div>
              <a
                href="/coustomer-dashboard/schedule"
                className="text-sm font-bold text-emerald-700 hover:text-emerald-800"
              >
                View all →
              </a>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Area</th>
                    <th className="px-5 py-4 font-semibold">Date & Time</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
             
              </table>
            </div>

          
          </section>

          {/* Area Status */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-slate-900">
                Area Power Status
              </h2>
              <span className="text-2xl">📍</span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Sample status for your neighborhood.
            </p>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-bold text-amber-900">
                    Planned Interruption
                  </p>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    A scheduled power interruption may affect your area
                    tomorrow.
                  </p>
                </div>
              </div>
            </div>



            <a
              href="/customer/schedules"
              className="mt-6 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Check Area Schedules →
            </a>
          </section>
        </div>

      
        {/* Power Saving Tips */}
        <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
              💡
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                PowerCare Tips
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                Be prepared for power interruptions
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                Charge essential devices in advance, keep a flashlight ready,
                save your work frequently, and unplug sensitive electronics
                during power fluctuations.
              </p>
            </div>
          </div>
        </section>


      </div>
    </main>
  );
};

export default CustomerDashboard;
