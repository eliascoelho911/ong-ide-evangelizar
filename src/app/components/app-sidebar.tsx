'use client';

import { NavDropdown } from "@/components/nav-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/ui/logo";
import { getNavMainData } from "@/app/data/get-sidebar-data";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUrl = usePathname();
  const navMain = getNavMainData(currentUrl);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavDropdown navMain={navMain.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
