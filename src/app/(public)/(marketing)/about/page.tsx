
import React from "react";

const features = [
  {
    icon: "⚡",
    title: "Load Shedding Schedules",
    description:
      "Help customers view planned power interruptions and prepare for scheduled outages.",
  },
  {
    icon: "🚨",
    title: "Outage Reporting",
    description:
      "Allow customers to report unexpected power failures and follow restoration progress.",
  },
  {
    icon: "🛠️",
    title: "Technician Management",
    description:
      "Help power operators assign technicians and coordinate outage repair activities.",
  },
  {
    icon: "🔔",
    title: "Smart Notifications",
    description:
      "Keep customers and technicians informed about important service updates.",
  },
];

const roles = [
  {
    icon: "👑",
    title: "Administrator",
    description:
      "Manages users, staff accounts, dashboard statistics, and system audit logs.",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: "⚙️",
    title: "Power Operator",
    description:
      "Manages zones, schedules, outage reports, service requests, and technician assignments.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: "🔧",
    title: "Technician",
    description:
      "Handles assigned outages and service requests and updates their progress.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: "👤",
    title: "Customer",
    description:
      "Views schedules, reports outages, requests services, and tracks payments.",
    color: "bg-emerald-50 text-emerald-700",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100">
              <span>⚡</span> About Our Project
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Building a Smarter
              <br />
              <span className="text-emerald-300">Power Management</span>
              System
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-50/90 sm:text-lg">
              Our Load Shedding & Power Outage Management System is designed
              to organize outage reporting, planned schedules, technician
              assignments, and electricity-related service requests in one
              convenient platform.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/register"
                className="rounded-xl bg-white px-6 py-3.5 font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                Get Started →
              </a>
              <a
                href="#our-mission"
                className="rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "4", label: "User Roles" },
              { value: "24/7", label: "Platform Access" },
              { value: "API", label: "Powered Backend" },
              { value: "1", label: "Unified Platform" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
              >
                <p className="text-2xl font-extrabold text-white sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-100 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="our-mission" className="px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Our Mission
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Making Power Service Management Simpler
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              Power interruptions can disrupt everyday life. This platform
              aims to make power-related information and service management
              more accessible by connecting customers, power operators,
              administrators, and technicians.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              From checking planned load shedding schedules to reporting
              outages and tracking service requests, the system brings
              important workflows together in one place.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Improve visibility of planned power interruptions",
                "Organize outage reporting and repair workflows",
                "Make service requests easier to track",
                "Support secure account and payment management",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    ✓
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100 p-6 sm:p-9">
              <div className="rounded-2xl border border-white bg-white p-6 shadow-lg shadow-emerald-900/5 sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                  ⚡
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                  One Connected System
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Designed to coordinate the key people and processes involved
                  in power outage and electricity service management.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    { icon: "👤", label: "Customers", detail: "Report and track" },
                    { icon: "⚙️", label: "Power Operators", detail: "Coordinate and manage" },
                    { icon: "🛠️", label: "Technicians", detail: "Repair and update" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-semibold text-slate-800">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-right text-xs text-slate-500">
                        {item.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Features Designed Around Your Needs
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Useful tools for organizing power interruptions and related
              service workflows.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Who Uses the Platform?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Four Roles, One Platform
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Each role has access to the features needed for its
              responsibilities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => (
              <article
                key={role.title}
                className="rounded-2xl border border-slate-200 p-6 transition hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${role.color}`}
                >
                  {role.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {role.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="bg-slate-900 px-5 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
              Built With
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Technology Behind the Platform
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              A modern backend stack designed to support structured data,
              authentication, and API-based operations.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              "Node.js",
              "Express.js",
              "TypeScript",
              "PostgreSQL",
              "Prisma ORM",
              "JWT",
              "Zod",
              "Redis",
              "Cloudinary",
              "REST API",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

   

    
    </div>
  );
};

export default About;
