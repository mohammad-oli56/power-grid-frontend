
import Link from "next/link";
import { Zap, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <Zap className="h-5 w-5 fill-white text-white" />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Power<span className="text-blue-500">Grid</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              PowerGrid helps you manage, monitor, and optimize your
              energy infrastructure with reliable and intelligent solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/features"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1 text-sm text-gray-400 transition hover:text-white"
                >
                  Dashboard
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span className="text-sm leading-5 text-gray-400">
                  123 Power Street,
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                <a
                  href="mailto:hello@powergrid.com"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  hello@powergrid.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-blue-500" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  +880 1234-567890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} PowerGrid. All rights reserved.
            </p>

            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-white"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

