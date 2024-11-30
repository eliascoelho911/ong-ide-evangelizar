'use client';

import * as React from "react"
import { NavDropdown } from "@/components/nav-dropdown"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "../../components/ui/logo"
import { getSidebarData } from "@/app/data/get-sidebar-data"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = await getSidebarData();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavDropdown navMain={data.navMain.navMain} />
      </SidebarContent>
      {data.user &&
        <SidebarFooter>
          <NavUser user={data.user.user} />
        </SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  )
}
