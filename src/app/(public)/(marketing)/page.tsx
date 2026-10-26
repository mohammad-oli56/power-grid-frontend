
import React from "react";



const Homepage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
    

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Smarter Power Management
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Stay Informed.
                <br />
                Stay <span className="text-emerald-600">Powered.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Manage power outages, check load shedding schedules, report
                electricity issues, and track service requests—all in one
                convenient platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/register"
                  className="rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  Get Started Free →
                </a>
                <a
                  href="#features"
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  Explore Features
                </a>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                <span>✓ Easy outage reporting</span>
                <span>✓ Schedule tracking</span>
                <span>✓ Service management</span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-200/50 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-teal-200/50 blur-3xl" />

              <div className="relative rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm text-slate-500">Power Overview</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      Your Area
                    </h2>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    Power Management
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <span className="text-2xl">⚡</span>
                    <p className="mt-3 text-sm text-slate-600">
                      Schedule Updates
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      Stay Informed
                    </p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-4">
                    <span className="text-2xl">🚨</span>
                    <p className="mt-3 text-sm text-slate-600">
                      Outage Reports
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      Track Progress
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-100 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-slate-900">
                      Planned Outage
                    </h3>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Schedule Preview
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
                        📍
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          Your Electricity Zone
                        </p>
                        <p className="text-sm text-slate-500">
                          Check your area's schedule
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">
                        Schedule information
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        Sign in to view available schedules and service
                        updates for your zone.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="/login"
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Access Your Dashboard →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-5 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                What We Offer
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Everything You Need to Manage Power
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Simple tools that connect customers, power operators, and
                technicians in one organized system.
              </p>
            </div>

          
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="bg-slate-50 px-5 py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Simple Process
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                How PowerCare Works
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Get started in just a few simple steps.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Create an Account",
                  text: "Register to access schedules, outage reporting, and service features.",
                },
                {
                  number: "02",
                  title: "Report or Request",
                  text: "Report a power outage or submit a request for an electricity-related service.",
                },
                {
                  number: "03",
                  title: "Track Progress",
                  text: "Follow updates and view the status of your reports and service requests.",
                },
              ].map((step) => (
                <div key={step.number} className="relative rounded-2xl bg-white p-7 shadow-sm">
                  <span className="text-sm font-extrabold tracking-widest text-emerald-600">
                    STEP {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / CTA */}
        <section id="about" className="px-5 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-3xl bg-slate-900 px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                    Take Control
                  </p>
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    A Smarter Way to Stay Connected to Your Power Services
                  </h2>
                  <p className="mt-5 leading-7 text-slate-300">
                    Access your dashboard to report outages, check schedules,
                    and manage your service requests in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
                  <a
                    href="/register"
                    className="rounded-xl bg-emerald-500 px-6 py-3.5 text-center font-bold text-white transition hover:bg-emerald-400"
                  >
                    Create Account →
                  </a>
                  <a
                    href="/login"
                    className="rounded-xl border border-slate-600 px-6 py-3.5 text-center font-bold text-white transition hover:bg-slate-800"
                  >
                    Login to Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
};

export default Homepage;
