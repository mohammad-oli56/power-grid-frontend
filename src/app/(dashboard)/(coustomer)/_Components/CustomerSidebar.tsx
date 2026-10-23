"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Schedule", href: "/coustomer-dashboard/schedule", icon: CalendarDays },
  { name: "Create Outage", href: "/coustomer-dashboard/create-outage", icon: Zap },
   { name: "My Outage", href: "/coustomer-dashboard/my-outages", icon: Zap },
  { name: "Payment", href: "/coustomer-dashboard/payment", icon: CreditCard },
  { name: "Create Service Request", href: "/coustomer-dashboard/service-request", icon: Wrench },
  { name: "My Service Request", href: "/coustomer-dashboard/my-service-request", icon: ClipboardList },
  { name: "Notification", href: "/coustomer-dashboard/notification", icon: Bell },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center justify-between border-b px-5">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <h1 className="text-xl font-bold">
            Power<span className="text-blue-600">Grid</span>
          </h1>
        </Link>

        <Button
          onClick={() => setIsOpen(false)}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          aria-label="Close menu"
        >
          <X size={22} />
        </Button>
      </div>

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
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
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
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100"
          aria-label="Open navigation"
        >
          <Menu size={26} />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <Button
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