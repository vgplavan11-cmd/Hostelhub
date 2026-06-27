import { ComplaintRepository } from "@/lib/repositories/ComplaintRepository"
import { UserRepository } from "@/lib/repositories/UserRepository"
import { WardenComplaintsTable } from "@/components/warden/WardenComplaintsTable"

export default async function WardenComplaintsPage() {
  const complaints = await ComplaintRepository.findAll()
  const users = await UserRepository.findAll()
  const staffList = users.filter(u => u.role !== 'student')

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Complaints</h1>
        <p className="text-muted-foreground mt-2">Manage student complaints and update their status.</p>
      </div>
      <WardenComplaintsTable complaints={complaints} users={users} staffList={staffList} />
    </div>
  )
}
