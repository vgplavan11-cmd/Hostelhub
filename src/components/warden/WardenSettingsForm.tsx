"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Bell, Shield, User, Smartphone, Mail, Clock, Key } from "lucide-react"
import { updateWardenProfile } from "@/app/actions/warden"

export function WardenSettingsForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false)

  // Split name for defaults if needed
  const nameParts = (user?.name || "").split(" ")
  const firstName = nameParts[0] || "John"
  const lastName = nameParts.slice(1).join(" ") || "Doe"

  async function handleProfileSave(formData: FormData) {
    setLoading(true)
    try {
      await updateWardenProfile(formData)
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleMockSave = () => {
    toast.success("Preferences updated successfully!")
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your warden preferences and notifications.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-card/60 backdrop-blur-md shadow-sm">
            <form action={handleProfileSave}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your contact details and office hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" name="firstName" defaultValue={firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" name="lastName" defaultValue={lastName} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" name="email" type="email" defaultValue={user?.email || "warden@example.com"} className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-number">Emergency Contact Number</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="contact-number" name="phone" type="tel" defaultValue={user?.profile?.phone || ""} placeholder="+1 (555) 000-0000" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office-hours">Office Hours</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="office-hours" name="officeHours" type="text" defaultValue={user?.profile?.officeHours || "Mon-Fri, 9:00 AM - 5:00 PM"} className="pl-9" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 pt-6">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card/60 backdrop-blur-md shadow-sm">
            <CardHeader>
              <CardTitle>Alert Preferences</CardTitle>
              <CardDescription>Configure how you receive hostel alerts and updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive daily summaries via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Emergency SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get immediate text messages for emergencies</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Visitor Approvals</Label>
                  <p className="text-sm text-muted-foreground">Notify me on new visitor requests</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Late Entry Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notify me when students enter after curfew</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card/60 backdrop-blur-md shadow-sm">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Update your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="current-password" type="password" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="new-password" type="password" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="confirm-password" type="password" className="pl-9" />
                </div>
              </div>
              
              <div className="pt-4 flex items-center justify-between border-t mt-6">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 pt-6">
              <Button onClick={handleMockSave}>
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
