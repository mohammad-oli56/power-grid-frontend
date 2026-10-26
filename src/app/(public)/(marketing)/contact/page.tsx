"use client"
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Support',
      value: 'support@powercare.com',
      description: 'Send us your questions anytime.',
    },
    {
      icon: '📞',
      title: 'Phone Support',
      value: '+880 1700-000000',
      description: 'Available Sunday–Thursday, 9 AM–5 PM.',
    },
    {
      icon: '📍',
      title: 'Our Location',
      value: 'Dhaka, Bangladesh',
      description: 'Supporting communities across Bangladesh.',
    },
  ];

  const faqs = [
    {
      question: 'How can I check load-shedding schedules?',
      answer:
        'Visit the Future Schedules page to explore upcoming planned power outages.',
    },
    {
      question: 'How do I report a power outage?',
      answer:
        'Sign in to your account and use the outage reporting or service request feature, if available.',
    },
    {
      question: 'How can I get technical assistance?',
      answer:
        'Contact our support team with a description of your issue so we can guide you.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 px-5 py-20 text-white sm:py-24">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            We're here to help
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Get in Touch with <span className="text-emerald-200">PowerCare</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">
            Have a question about power schedules, outage reporting, or technical
            support? We would love to hear from you.
          </p>

          <a
            href="#contact-form"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 font-bold text-emerald-800 shadow-lg transition hover:-translate-y-1 hover:bg-emerald-50"
          >
            Contact Our Team <span className="ml-2">→</span>
          </a>
        </div>
      </section>

      {/* Contact information */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Contact Information
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            We'd love to hear from you
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
            Choose the best way to reach us. Our team is ready to help with your
            questions and concerns.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl transition group-hover:bg-emerald-100">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 break-words font-semibold text-emerald-700">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Form and FAQ */}
      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div id="contact-form">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Send a Message
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              How can we help?
            </h2>
            <p className="mt-3 leading-7 text-slate-500">
              Fill out the form below and tell us how we can assist you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option>General Inquiry</option>
                  <option>Load Shedding Schedule</option>
                  <option>Power Outage Report</option>
                  <option>Technical Support</option>
                  <option>Account & Login</option>
                  <option>Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

             

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 sm:w-auto"
              >
                Send Message <span>→</span>
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div>
            <div className="rounded-3xl bg-slate-50 p-6 sm:p-8">
              <span className="text-3xl">💬</span>
              <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 leading-7 text-slate-500">
                Looking for a quick answer? Here are a few things you might want
                to know.
              </p>

              <div className="mt-7 space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-slate-200 bg-white p-5"
                    open={index === 0}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-800">
                      {faq.question}
                      <span className="text-xl text-emerald-700 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 p-7 text-white">
              <h3 className="text-xl font-bold">Need urgent assistance?</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50">
                For an immediate electrical hazard, stay away from exposed
                wires and contact your local electricity provider or emergency
                services.
              </p>
              <a
                href="https://www.powerdivision.gov.bd/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-lg bg-white/15 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/25"
              >
                Visit Power Division ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-4xl">⚡</div>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Together, we keep communities informed.
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            PowerCare helps people stay informed about planned outages and power
            service updates.
          </p>
          <a
            href="/"
            className="mt-7 inline-flex rounded-xl bg-emerald-700 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-800"
          >
            Back to Home
          </a>
        </div>
      </section>


    </main>
  );
};

export default Contact;
