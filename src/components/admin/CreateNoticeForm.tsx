"use client"

import { useState } from "react"
import { createNotice } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function CreateNoticeForm() {
  const [loading, setLoading] = useState(false)

  async function action(formData: FormData) {
    setLoading(true)
    try {
      await createNotice(formData)
      toast.success("Notice created successfully")
    } catch (error) {
      toast.error("Failed to create notice")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Notice Title</Label>
        <Input id="title" name="title" required placeholder="e.g. Mandatory Hostel Meeting" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <textarea 
          id="content" 
          name="content" 
          required 
          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Details..." 
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Publishing..." : "Publish Notice"}
      </Button>
    </form>
  )
}
