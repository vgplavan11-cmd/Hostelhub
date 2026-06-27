"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Bell, Search, LayoutDashboard, Users, Home, AlertCircle, Calendar, UserCheck, MessageSquare, PieChart, Settings, LogOut, Building } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const getNavItems = (role?: string): NavItem[] => {
  const base = "/student"
  if (role === "admin") {
    return [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Hostels", href: "/admin/hostels", icon: Building },
      { name: "Rooms", href: "/admin/rooms", icon: Home },
      { name: "Notices", href: "/admin/notices", icon: MessageSquare },
      { name: "Analytics", href: "/admin/analytics", icon: PieChart },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
  if (role === "warden") {
    return [
      { name: "Dashboard", href: "/warden", icon: LayoutDashboard },
      { name: "Students", href: "/warden/students", icon: Users },
      { name: "Complaints", href: "/warden/complaints", icon: AlertCircle },
      { name: "Leave Requests", href: "/warden/leaves", icon: Calendar },
      { name: "Visitors", href: "/warden/visitors", icon: UserCheck },
      { name: "Notices", href: "/warden/notices", icon: MessageSquare },
      { name: "Settings", href: "/warden/settings", icon: Settings },
    ]
  }
  // Default to student
  return [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "Complaints", href: "/student/requests", icon: AlertCircle },
    { name: "Leave Requests", href: "/student/leaves", icon: Calendar },
    { name: "Visitors", href: "/student/visitors", icon: UserCheck },
    { name: "Notices", href: "/student/notices", icon: MessageSquare },
    { name: "Settings", href: "/student/settings", icon: Settings },
  ]
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { data: session } = useSession()
  const pathname = usePathname()
  
  // Close sidebar on mobile initially
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }, [])

  const navItems = getNavItems((session?.user as any)?.role)

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          initial={{ width: isSidebarOpen ? 280 : 0, x: isSidebarOpen ? 0 : -280 }}
          animate={{ width: isSidebarOpen ? 280 : 0, x: isSidebarOpen ? 0 : -280 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border overflow-hidden whitespace-nowrap shadow-[4px_0_24px_rgba(0,0,0,0.02)] rounded-r-2xl lg:rounded-none print:hidden"
        >
          <div className="h-16 flex items-center px-6 border-b border-border/50 shrink-0">
            <NextLink href="/" className="text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2">
              HostelHub <span className="text-xl">✨</span>
            </NextLink>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && item.href !== "/warden" && item.href !== "/student" && pathname.startsWith(item.href))
              return (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
                  }`}
                >
                  <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"}`} />
                  <span className="font-medium">{item.name}</span>
                </NextLink>
              )
            })}
          </div>

          <div className="p-4 border-t border-border/50 shrink-0">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group"
            >
              <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors" />
              <span className="font-medium">Logout</span>
            </button>
            
            <div className="mt-4 flex items-center gap-3 px-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0 border border-primary/20">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{session?.user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate capitalize">{(session?.user as any)?.role || "Student"}</p>
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible print:block">
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 bg-card/80 backdrop-blur-md border-b border-border/50 shadow-sm print:hidden">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border/50 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all max-w-xs">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <button className="relative p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary border-2 border-card"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20 cursor-pointer lg:hidden">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto print:overflow-visible p-4 sm:p-6 lg:p-8 bg-background print:bg-white print:p-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-7xl h-full print:h-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
