import { Link } from "@tanstack/react-router"

import {
  CircleHelp,
  Settings,
  ShieldCheck,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const supportItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Security",
    url: "/security",
    icon: ShieldCheck,
  },
  {
    title: "Help",
    url: "/help",
    icon: CircleHelp,
  },
]

export function NavSupport() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Support
      </SidebarGroupLabel>

      <SidebarMenu>
        {supportItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              render={<Link to={item.url} />}
              tooltip={item.title}
            >
              <item.icon />

              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}