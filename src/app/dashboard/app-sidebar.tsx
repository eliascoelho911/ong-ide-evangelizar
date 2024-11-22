import * as React from "react"

import { Users, School, Files } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/components/ui/logo"

const data = {
  navMain: [
    {
      title: "Turmas",
      path: "turmas",
      icon: School
    },
    {
      title: "Alunos",
      path: "alunos",
      icon: Users
    },
    {
      title: "Professores",
      path: "#",
      icon: Users
    },
    {
      title: "Documentos",
      path: "#",
      icon: Files
    }
  ],
}

export function AppSidebar({ currentPath, ...props }: { currentPath: string } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild isActive={currentPath.endsWith(item.path)}>
                    <a href={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
