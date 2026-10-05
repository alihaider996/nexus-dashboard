"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSupport } from "@/components/nav-support"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  BarChart3,
  Boxes,
  CircleHelp,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Ali",
    email: "ali@nexus.com",
    avatar: "",
  },

  teams: [
    {
      name: "Nexus",
      logo: <Boxes />,
      plan: "SaaS Platform",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboard />,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: <CreditCard />,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: <Users />,
    },
    {
      title: "Message",
      url: "/message",
      icon: <MessageSquare />,
    },
  ],

  projects: [
    // {
    //   name: "Settings",
    //   url: "/settings",
    //   icon: <Settings />,
    // },
    // {
    //   name: "Security",
    //   url: "/security",
    //   icon: <ShieldCheck />,
    // },
    // {
    //   name: "Help",
    //   url: "/help",
    //   icon: <CircleHelp />,
    // },
  ],
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavProjects projects={data.projects} />
        
          <NavSupport />

      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}