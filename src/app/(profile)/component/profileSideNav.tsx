"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  UserRound,
  LogOut,
  LoaderCircle,
  Menu,
  X,
  KeyRound,
  UserRoundPen,
  ImagePlus,
  CalendarDays,
  LayoutDashboard,
  
} from "lucide-react";

import { logout } from "@/service/logout";

const menuItems = [
  {
    name: "Dashboard",
    href: "/profile",
    icon: LayoutDashboard,
  },
  {
    name: "Update Profile",
    href: "/profile/update-profile",
    icon: UserRoundPen,
  },
  {
    name: "Upload Image",
    href: "/profile/upload-image",
    icon: ImagePlus,
  },
  {
    name: "Reset Password",
    href: "/profile/reset-password",
    icon: CalendarDays,
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

      setIsOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/profile") {
      return pathname === "/profile";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-gray-100 px-5">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
          aria-label="PowerGrid home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <LayoutDashboard className="h-6 w-6" />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Power<span className="text-blue-600">Grid</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={closeMobileMenu}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Profile navigation"
        className="flex-1 space-y-1 p-4"
      >
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Account Settings
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoggingOut ? (
            <LoaderCircle className="h-5 w-5 shrink-0 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5 shrink-0" />
          )}

          <span>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>

        <p className="mt-3 text-center text-xs text-gray-400">
          PowerGrid Account
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="PowerGrid home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <LayoutDashboard className="h-5 w-5" />
          </span>

          <span className="text-lg font-extrabold text-gray-900">
            Power<span className="text-blue-600">Grid</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 cursor-default border-0 bg-black/50 p-0 lg:hidden"
        />
      )}

      {/* Mobile drawer */}
      <aside
        id="mobile-profile-sidebar"
        aria-label="Mobile profile sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
        <SidebarContent />
      </aside>
    </>
  );
};

export default ProfileSidebar;