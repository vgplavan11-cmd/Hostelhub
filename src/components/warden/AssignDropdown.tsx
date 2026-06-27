"use client"

import { useState } from "react"
import { assignComplaint } from "@/app/actions/warden"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { User } from "@/lib/repositories/UserRepository"

interface AssignDropdownProps {
  complaintId: string;
  currentAssigneeId?: string;
  staffList: User[];
}

export function AssignDropdown({ complaintId, currentAssigneeId, staffList }: AssignDropdownProps) {
  const [loading, setLoading] = useState(false)

  async function handleValueChange(value: string | null) {
    if (!value) return;
    setLoading(true)
    try {
      await assignComplaint(complaintId, value)
      toast.success("Complaint assigned")
    } catch (error) {
      toast.error("Failed to assign complaint")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select disabled={loading} defaultValue={currentAssigneeId || ""} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Unassigned" />
      </SelectTrigger>
      <SelectContent>
        {staffList.map((staff) => (
          <SelectItem key={staff.id} value={staff.id}>
            {staff.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
