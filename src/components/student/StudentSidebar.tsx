"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, BellRing, Settings, Calendar, Users } from "lucide-react"

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
  { title: "Overview", icon: Home, url: "/student" },
  { title: "Complaints", icon: FileText, url: "/student/requests" },
  { title: "Leave Requests", icon: Calendar, url: "/student/leaves" },
  { title: "Visitors", icon: Users, url: "/student/visitors" },
  { title: "Notices", icon: BellRing, url: "/student/notices" },
  { title: "Settings", icon: Settings, url: "/student/settings" },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Student Dashboard</SidebarGroupLabel>
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
