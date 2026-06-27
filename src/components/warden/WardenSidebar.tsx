"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, MessageSquare, Calendar, UserCheck, BellRing, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Overview", icon: Home, url: "/warden" },
  { title: "Students", icon: Users, url: "/warden/students" },
  { title: "Complaints", icon: MessageSquare, url: "/warden/complaints" },
  { title: "Leave Requests", icon: Calendar, url: "/warden/leaves" },
  { title: "Visitors", icon: UserCheck, url: "/warden/visitors" },
  { title: "Notices", icon: BellRing, url: "/warden/notices" },
  { title: "Settings", icon: Settings, url: "/warden/settings" },
]

export function WardenSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Warden Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={pathname === item.url}
                    render={
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
