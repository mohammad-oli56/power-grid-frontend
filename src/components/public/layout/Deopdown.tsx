
"use client";

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
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email?: string;
  role: string;
};

export function DropdownMenuDemo({ user }: { user: User }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const handleDashboard = () => {
    const dashboardPath =
      user.role === "ADMIN"
        ? "/admin-dashboard"
        : user.role === "LANDLORD"
          ? "/landlord-dashboard"
          : user.role === "CUSTOMER"
            ? "/coustomer-dashboard"
            : "/";

    router.push(dashboardPath);
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">{user.name}</Button>}
      />

      <DropdownMenuContent className="w-48" align="end">
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

          <DropdownMenuItem onClick={handleProfile}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDashboard}>
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

