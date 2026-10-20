
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  Wrench,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Assign Outage",
    href: "/technician-dashboard/assigne-outage",
    icon: CalendarDays,
  },
  {
    name: "Assigned Service",
    href: "/technician-dashboard/assigne-service",
    icon: Wrench,
  },
  {
    name: "Notifications",
    href: "/technician-dashboard/technician-notification",
    icon: Bell,
  },
];

export default function TechnicianSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-5">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <h1 className="text-xl font-bold">
            Power<span className="text-blue-600">Grid</span>
          </h1>
        </Link>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="md:hidden"
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
              key={item.name}
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
        <button
          type="button"
          onClick={() => {
            // Add your logout logic here
          }}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
        <Link href="/" className="text-xl font-bold">
          Power<span className="text-blue-600">Grid</span>
        </Link>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={26} />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-white md:block">
        <SidebarContent />
      </aside>
    </>
  );
}
