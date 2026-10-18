
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";
import { getMe } from "@/service/getMe";
import { DropdownMenuDemo } from "./Deopdown";

const Header = async () => {
  const user = await getMe();
// console.log(user.data)
  const routes = [
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <Zap className="h-5 w-5 fill-white text-white" />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Power<span className="text-blue-600">grid</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              {route.name}
            </Link>
          ))}
        </nav>

        {/* Authentication */}
        <div className="flex items-center gap-3">
          {user?.success !== false ? (
            <DropdownMenuDemo user={user.data} />
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

