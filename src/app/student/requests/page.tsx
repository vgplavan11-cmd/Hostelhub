import { auth } from "@/lib/auth"
import { ComplaintRepository } from "@/lib/repositories/ComplaintRepository"
import { RequestsTables } from "@/components/student/RequestsTables"

export default async function ComplaintsPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const complaints = await ComplaintRepository.findByStudent(session.user.id)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Complaints</h1>
        <p className="text-muted-foreground mt-2">Manage your hostel complaints and issues.</p>
      </div>
      <RequestsTables complaints={complaints} />
    </div>
  )
}
