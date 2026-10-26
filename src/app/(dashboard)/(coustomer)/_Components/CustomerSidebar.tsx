
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  Zap,
  CreditCard,
  Wrench,
  Bell,
  LogOut,
  Menu,
  ClipboardList,
  X,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { logout } from "@/service/logout";

const menuItems = [
  {
    name: "Schedule",
    href: "/coustomer-dashboard/schedule",
    icon: CalendarDays,
  },
  {
    name: "Create Outage",
    href: "/coustomer-dashboard/create-outage",
    icon: Zap,
  },
  {
    name: "My Outage",
    href: "/coustomer-dashboard/my-outages",
    icon: Zap,
  },
  {
    name: "Payment History",
    href: "/coustomer-dashboard/payment",
    icon: CreditCard,
  },
  {
    name: "Create Service Request",
    href: "/coustomer-dashboard/service-request",
    icon: Wrench,
  },
  {
    name: "My Service Request",
    href: "/coustomer-dashboard/my-service-request",
    icon: ClipboardList,
  },
  {
    name: "Notification",
    href: "/coustomer-dashboard/notification",
    icon: Bell,
  },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setLogoutError("");

      await logout();

      // Close mobile sidebar
      setIsOpen(false);

      // Redirect after successful logout
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);

      setLogoutError(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-5">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold"
        >
          Power<span className="text-blue-600">Grid</span>
        </Link>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="rounded-lg p-2 md:hidden"
          aria-label="Close menu"
        >
          <X size={22} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        {logoutError && (
          <p
            role="alert"
            className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-600"
          >
            {logoutError}
          </p>
        )}

        <button
          type="button"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingOut ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} />
          )}

          <span>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
        <Link href="/" className="text-xl font-bold">
          Power<span className="text-blue-600">Grid</span>
        </Link>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2"
          aria-label="Open navigation"
        >
          <Menu size={26} />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-white md:block">
        <SidebarContent />
      </aside>
    </>
  );
}
