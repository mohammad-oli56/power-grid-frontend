
import { ReactNode } from "react";
import CustomerSidebar from "./Components/CustomerSidebar";


export default function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 shrink-0 border-r bg-white">
        <CustomerSidebar />
      </aside>

      {/* Right Content */}
      <main className="min-w-0 flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
}

