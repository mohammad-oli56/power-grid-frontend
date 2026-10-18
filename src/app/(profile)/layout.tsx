
import { ReactNode } from "react";
import ProfileSidebar from "./component/profileSideNav";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full shrink-0 border-b border-gray-200 bg-white md:min-h-screen md:w-56 md:border-b-0 md:border-r lg:w-64">
        <ProfileSidebar />
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 bg-gray-50 p-4 sm:p-5 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
