"use client"

import { useState } from "react"
import { submitVisitorRequest } from "@/app/actions/student"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function VisitorForm() {
  const [loading, setLoading] = useState(false)

  async function action(formData: FormData) {
    setLoading(true)
    try {
      await submitVisitorRequest(formData)
      toast.success("Visitor request submitted successfully")
    } catch (error) {
      toast.error("Failed to submit visitor request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="visitorName">Visitor Name</Label>
        <Input id="visitorName" name="visitorName" required placeholder="Jane Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="relationship">Relationship</Label>
        <Input id="relationship" name="relationship" required placeholder="e.g. Parent, Sibling" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="visitDate">Date of Visit</Label>
        <Input id="visitDate" name="visitDate" type="date" required />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  )
}
