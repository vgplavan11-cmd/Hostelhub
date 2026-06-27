import { getStudentDetails } from "@/app/actions/student"
import { UserRepository } from "@/lib/repositories/UserRepository"
import { StudentSettingsForm } from "@/components/student/StudentSettingsForm"

export default async function SettingsPage() {
  const details = await getStudentDetails()
  const dbUser = await UserRepository.findById(details.user?.id as string)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences.</p>
      </div>
      <StudentSettingsForm 
        initialProfile={dbUser?.profile}
        hostel={details.hostel}
        room={details.room}
        user={details.user}
      />
    </div>
  )
}
