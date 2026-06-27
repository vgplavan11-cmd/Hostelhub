"use client"

import { useState } from "react"
import { resolveEmergencyAlert } from "@/app/actions/warden"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ShieldCheck } from "lucide-react"

export function ResolveAlertButton({ alertId }: { alertId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleResolve() {
    setLoading(true)
    try {
      await resolveEmergencyAlert(alertId)
      toast.success("Alert resolved successfully")
    } catch (error) {
      toast.error("Failed to resolve alert")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      disabled={loading} 
      onClick={handleResolve}
      className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
    >
      <ShieldCheck className="h-4 w-4 mr-2" />
      Mark Resolved
    </Button>
  )
}
