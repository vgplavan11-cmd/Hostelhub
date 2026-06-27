import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session || (session.user as any)?.role !== "admin") {
    redirect("/login")
  }

  return (
    <TooltipProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </TooltipProvider>
  )
}
