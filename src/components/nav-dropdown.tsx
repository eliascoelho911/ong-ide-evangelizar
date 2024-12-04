import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export interface NavMainProps {
  navMain: {
    title: string
    content: {
      title: string
      icon?: LucideIcon
      isOpen?: boolean
      items: {
        title: string
        url: string
        isActive?: boolean
      }[]
    }[]
  }[]
}

function NavMainGroup({
  navMain,
}: {
  navMain: NavMainProps["navMain"][0]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{navMain.title}</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.content.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isOpen}
            className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function NavDropdown({
  navMain,
}: NavMainProps) {
  return (
    navMain.map((item) => (
      <NavMainGroup key={item.title} navMain={item} />
    ))
  );
}
