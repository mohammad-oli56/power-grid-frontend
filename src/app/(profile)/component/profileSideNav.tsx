"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  User,
  LogOut,
  LoaderCircle,
  Menu,
  X,
} from "lucide-react";
import { logout } from "@/service/logout";

const menuItems = [
  {
    name: "Reset password",
    href: "/profile/reset-password",
    icon: CalendarDays,
  },
  {
    name: "Update Profile",
    href: "/profile/update-profile",
    icon: User,
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* Logo / Header */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <h1 className="text-xl font-bold text-gray-900">
            Power<span className="text-blue-600">Grid</span>
          </h1>
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
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
              onClick={() => setIsOpen(false)}
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
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          {isLoggingOut ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex h-16 w-full items-center justify-between border-b bg-white px-4 lg:hidden">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-900">
            Power<span className="text-blue-600">Grid</span>
          </h1>
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Backdrop & Drawer Overlay (Fixed using a semantic button instead of a div) */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 w-full h-full bg-black/50 backdrop-blur-sm border-none p-0 cursor-default lg:hidden"
        />
      )}

      {/* Sliding Drawer for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Permanent Desktop Sidebar */}
      <aside className="hidden h-screen w-64 flex-col border-r bg-white lg:flex sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
};

export default ProfileSidebar;