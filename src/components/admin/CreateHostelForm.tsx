"use client"

import { useState } from "react"
import { createHostel } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function CreateHostelForm() {
  const [loading, setLoading] = useState(false)

  async function action(formData: FormData) {
    setLoading(true)
    try {
      await createHostel(formData)
      toast.success("Hostel created successfully")
    } catch (error) {
      toast.error("Failed to create hostel")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Hostel Name</Label>
        <Input id="name" name="name" required placeholder="e.g. Alpha Block" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" required placeholder="123 Campus Dr" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input id="capacity" name="capacity" type="number" required min="1" placeholder="e.g. 100" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Hostel"}
      </Button>
    </form>
  )
}
