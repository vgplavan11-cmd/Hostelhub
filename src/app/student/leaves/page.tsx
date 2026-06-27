import { auth } from "@/lib/auth"
import { LeaveRequestRepository } from "@/lib/repositories/LeaveRequestRepository"
import { LeavesTable } from "@/components/student/LeavesTable"

export default async function LeavesPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const leaves = await LeaveRequestRepository.findByStudent(session.user.id)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Leave Requests</h1>
        <p className="text-muted-foreground mt-2">Manage your leave requests.</p>
      </div>
      <LeavesTable leaves={leaves} />
    </div>
  )
}
