"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Box,
  LayoutDashboard,
  Settings,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarUser from "./sidebar-user";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/user",
    icon: UsersRound,
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: Box,
  },
  {
    title: "Products",
    url: "/admin/product",
    icon: ShoppingBasket,
  },
  {
    title: "Settings",
    url: "/admin/setting",
    icon: Settings,
  },
];

export function AdminSidebar({ userData }: { userData: any }) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between pb-2">
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <ModeToggle />
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      // Exact match for the Dashboard route
                      (item.url === "/admin" && pathname === item.url) ||
                      // Exact match for other routes or sub-paths
                      (item.url !== "/admin" &&
                        (pathname === item.url ||
                          pathname.startsWith(`${item.url}/`)))
                    }
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser userData={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
