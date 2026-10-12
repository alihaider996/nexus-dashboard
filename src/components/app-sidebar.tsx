"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSupport } from "@/components/nav-support"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Boxes,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Users,
  ClipboardCheck,
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
      name: "Flow",
      logo: <Boxes />,
      plan: "Business platform",
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
    {
      title: "Onboarding",
      url: "/onboarding",
      icon: <ClipboardCheck />,
    },
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

        <NavSupport />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}