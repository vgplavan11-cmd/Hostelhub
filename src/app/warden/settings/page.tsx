import { auth } from "@/lib/auth"
import { WardenSettingsForm } from "@/components/warden/WardenSettingsForm"

export default async function WardenSettingsPage() {
  const session = await auth()
  
  if (!session?.user) return null

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your warden profile and notification preferences.</p>
      </div>
      <WardenSettingsForm user={session.user} />
    </div>
  )
}
