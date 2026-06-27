"use client"

import { useState } from "react"
import { createRoom } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Hostel } from "@/lib/repositories/HostelRepository"

export function CreateRoomForm({ hostels }: { hostels: Hostel[] }) {
  const [loading, setLoading] = useState(false)

  async function action(formData: FormData) {
    setLoading(true)
    try {
      await createRoom(formData)
      toast.success("Room created successfully")
    } catch (error) {
      toast.error("Failed to create room")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hostelId">Hostel</Label>
        <Select name="hostelId" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a hostel" />
          </SelectTrigger>
          <SelectContent>
            {hostels.map(hostel => (
              <SelectItem key={hostel.id} value={hostel.id}>{hostel.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="roomNumber">Room Number</Label>
        <Input id="roomNumber" name="roomNumber" required placeholder="e.g. 101A" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input id="capacity" name="capacity" type="number" required min="1" placeholder="e.g. 2" />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Room"}
      </Button>
    </form>
  )
}
