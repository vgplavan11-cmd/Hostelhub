"use client"

import { useState } from "react"
import { updateVisitorStatus } from "@/app/actions/warden"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export function VisitorStatusDropdown({ visitorId, currentStatus }: { visitorId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)

  async function handleValueChange(value: string | null) {
    if (!value) return;
    setLoading(true)
    try {
      await updateVisitorStatus(visitorId, value)
      toast.success("Visitor status updated")
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
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
        <SelectItem value="checked-in">Checked-In</SelectItem>
        <SelectItem value="checked-out">Checked-Out</SelectItem>
      </SelectContent>
    </Select>
  )
}
