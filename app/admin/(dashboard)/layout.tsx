import { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/custom/admin-sidebar";
import { BreadcrumbWithCustomSeparator } from "@/components/custom/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data from cookies (server-side)
  const cookieStore = await cookies();
  const userData = JSON.parse(cookieStore.get("userData")?.value || "{}");

  return (
    <div>
      <SidebarProvider>
        <div className="flex min-h-[calc(100vh-56px)] w-full">
          {/* Sidebar */}
          <AdminSidebar userData={userData} />

          {/* Main Content */}
          <div className="flex-1 w-full px-4 py-4">
            <div className="flex items-center gap-2 px-2">
              {/* Sidebar Trigger */}
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/* Breadcrumb */}
              <BreadcrumbWithCustomSeparator />
            </div>
            {/* Separator between breadcrumb and main content */}
            <Separator className="px-2 my-4" />
            {/* Page Content */}
            <section className="flex-1 px-2 overflow-visible">
              {children}
            </section>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
