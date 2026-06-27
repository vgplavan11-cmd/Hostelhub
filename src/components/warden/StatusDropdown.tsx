"use client"

import { useState } from "react"
import { updateComplaintStatus } from "@/app/actions/warden"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export function StatusDropdown({ complaintId, currentStatus }: { complaintId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)

  async function handleValueChange(value: string | null) {
    if (!value) return;
    setLoading(true)
    try {
      await updateComplaintStatus(complaintId, value)
      toast.success("Status updated")
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select disabled={loading} defaultValue={currentStatus} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="in-progress">In-Progress</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
      </SelectContent>
    </Select>
  )
}
