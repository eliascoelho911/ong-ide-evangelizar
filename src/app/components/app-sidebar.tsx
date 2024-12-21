'use client';

import { NavDropdown } from "@/components/nav-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "@/components/ui/logo";
import { getNavMainData } from "@/data/get-sidebar-data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getStudentsRoute } from "../routes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUrl = usePathname();
  const navMain = getNavMainData(currentUrl);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href={getStudentsRoute()}> <Logo /> </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavDropdown navMain={navMain.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
