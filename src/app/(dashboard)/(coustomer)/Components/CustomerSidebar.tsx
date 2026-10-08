
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  User,
  Zap,
  CreditCard,
  Wrench,
  Bell,
  LogOut,
} from "lucide-react";




const menuItems = [


  {
    name: "Schedule",
    href: "/coustomer-dashboard/schedule",
    icon: CalendarDays,
  },
  {
    name: "Profile",
    href: "/coustomer-dashboard/profile",
    icon: User,
  },
  {
    name: "Outage",
    href: "/coustomer-dashboard/outage",
    icon: Zap,
  },
  {
    name: "Payment",
    href: "/coustomer-dashboard/payment",
    icon: CreditCard,
  },
  {
    name: "Service Request",
    href: "/coustomer-dashboard/service-request",
    icon: Wrench,
  },
  {
    name: "Notification",
    href: "/coustomer-dashboard/notification",
    icon: Bell,
  },
];



const CustomerSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-900">
            Power<span className="text-blue-600">Grid</span>
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/coustomer-dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default CustomerSidebar;

