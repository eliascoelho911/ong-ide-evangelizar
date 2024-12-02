'use client';

import { useEffect, useState } from 'react';
import { NavDropdown } from "@/components/nav-dropdown";
import { NavUser, NavUserProps } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/ui/logo";
import { getNavMainData, getNavUserData } from "@/app/data/get-sidebar-data";
import { usePathname } from "next/navigation";
import { getLoggedUserData } from '@/services/user-service';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUrl = usePathname();
  const navMain = getNavMainData(currentUrl);
  const [navUser, setNavUser] = useState<NavUserProps | null>(null);

  useEffect(() => {
    setNavUser(null);
    getLoggedUserData().then((data) => {
      setNavUser(getNavUserData(data));
    });
  }, [navMain]);

  if (!navUser) {
    // Você pode retornar um spinner ou algo enquanto os dados são carregados.
    return <div>Loading...</div>;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavDropdown navMain={navMain.navMain} />
      </SidebarContent>
      {navUser && (
        <SidebarFooter>
          <NavUser user={navUser.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
