"use client"

import { useState } from "react"
import { updateLeaveStatus } from "@/app/actions/warden"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Check, X } from "lucide-react"

export function ApproveRejectButtons({ leaveId }: { leaveId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleStatus(status: "approved" | "rejected") {
    setLoading(true)
    try {
      await updateLeaveStatus(leaveId, status)
      toast.success(`Leave ${status}`)
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="default" 
        disabled={loading} 
        onClick={() => handleStatus("approved")}
      >
        <Check className="h-4 w-4 mr-1" /> Approve
      </Button>
      <Button 
        size="sm" 
        variant="destructive" 
        disabled={loading} 
        onClick={() => handleStatus("rejected")}
      >
        <X className="h-4 w-4 mr-1" /> Reject
      </Button>
    </div>
  )
}
