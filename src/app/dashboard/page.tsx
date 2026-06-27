import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardRedirectPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }
  
  const role = (session.user as any).role
  
  if (role === "admin") {
    redirect("/admin")
  } else if (role === "warden") {
    redirect("/warden")
  } else {
    redirect("/student")
  }
}
