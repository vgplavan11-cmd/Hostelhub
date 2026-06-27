import { auth } from "@/lib/auth"
import { VisitorRepository } from "@/lib/repositories/VisitorRepository"
import { VisitorsTable } from "@/components/student/VisitorsTable"

export default async function VisitorsPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const visitors = await VisitorRepository.findByStudent(session.user.id)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Visitors</h1>
        <p className="text-muted-foreground mt-2">Manage your expected visitors.</p>
      </div>
      <VisitorsTable visitors={visitors} />
    </div>
  )
}
