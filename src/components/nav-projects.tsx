import { Link } from "@tanstack/react-router"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavProject = {
  name: string
  url: string
  icon: React.ReactNode
}

type NavProjectsProps = {
  projects: NavProject[]
}

export function NavProjects({
  projects,
}: NavProjectsProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Tools
      </SidebarGroupLabel>

      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              render={<Link to={item.url} />}
              tooltip={item.name}
            >
              {item.icon}

              <span>{item.name}</span>

              {item.name === "Automation" && (
                <span className="ml-auto rounded-md border px-1.5 py-0.5 text-[10px] font-medium group-data-[collapsible=icon]:hidden">
                  BETA
                </span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}