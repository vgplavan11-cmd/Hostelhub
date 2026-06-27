"use client"

import { useState } from "react"
import { triggerEmergencyAlert } from "@/app/actions/student"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertOctagon } from "lucide-react"
import { toast } from "sonner"

export function EmergencyButton() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  async function action(formData: FormData) {
    setLoading(true)
    try {
      const type = formData.get("type") as any
      const message = formData.get("message") as string
      await triggerEmergencyAlert(type, message)
      toast.success("Emergency alert sent to all Wardens and Admins!")
      setOpen(false)
    } catch (error) {
      toast.error("Failed to send alert")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="destructive" size="lg" className="w-full h-16 text-lg font-bold shadow-md animate-pulse">
          <AlertOctagon className="mr-2 h-6 w-6" />
          EMERGENCY ALERT
        </Button>
      } />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center">
            <AlertOctagon className="mr-2 h-5 w-5" /> 
            Trigger Emergency Alert
          </DialogTitle>
          <DialogDescription>
            This will immediately notify all wardens and administrators. Misuse of this system is strictly prohibited.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="type">Emergency Type</Label>
            <Select name="type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical Emergency</SelectItem>
                <SelectItem value="fire">Fire / Safety</SelectItem>
                <SelectItem value="security">Security Threat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Brief Details / Location</Label>
            <Input id="message" name="message" required placeholder="e.g. Fire on 2nd floor, Room 204" />
          </div>
          <Button type="submit" variant="destructive" disabled={loading} className="w-full">
            {loading ? "Sending Alert..." : "CONFIRM & SEND ALERT"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
