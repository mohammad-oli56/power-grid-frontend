
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/service/logout";

type User = {
  name: string;
  email?: string;
  role: string;
};

export function DropdownMenuDemo({ user }: { user: User }) {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setLogoutError("");

      await logout();

      // Redirect after successful logout
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

const handleDashboard = () => {
  const dashboardPath =
    user.role === "ADMIN"
      ? "/admin-dashboard"
      : user.role === "TECHNICIAN"
        ? "/technician-dashboard"
        : user.role === "CUSTOMER"
          ? "/coustomer-dashboard"
          : user.role === "POWER_OPERATOR"
            ? "/power-operator-dashboard"
            : "/";

  router.push(dashboardPath);
};

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">{user.name}</Button>}
        />

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user.name}</span>

                {user.email && (
                  <span className="text-xs font-normal text-gray-500">
                    {user.email}
                  </span>
                )}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleProfile}>
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleDashboard}>
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                void handleLogout();
              }}
              disabled={isLoggingOut}
              className="text-red-600 focus:text-red-600"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {logoutError && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {logoutError}
        </p>
      )}
    </div>
  );
}
