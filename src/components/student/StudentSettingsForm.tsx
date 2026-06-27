"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { updateStudentProfile } from "@/app/actions/student"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"
import { 
  User, Shield, Bell, Lock, MonitorSmartphone, 
  HelpCircle, AlertTriangle, Eye, EyeOff, LogOut,
  Download, Trash2, Camera
} from "lucide-react"

export function StudentSettingsForm({ 
  initialProfile,
  hostel,
  room,
  user 
}: { 
  initialProfile?: any,
  hostel?: any,
  room?: any,
  user?: any
}) {
  const [loading, setLoading] = useState(false)
  const [department, setDepartment] = useState(initialProfile?.department || "")
  const [year, setYear] = useState(initialProfile?.year || "")
  
  // UI Mock States
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    complaints: true,
    leaves: true,
    visitors: false,
    notices: true,
    emergency: true
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    hidePhone: false,
    emailNotifications: true
  })

  // Retained real action for actual data
  async function action(formData: FormData) {
    setLoading(true)
    try {
      await updateStudentProfile(formData)
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  // Mock handler for UI elements
  const handleMockSave = (section: string) => {
    toast.success(`${section} settings saved successfully!`)
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      
      {/* 1. Profile Information (Real Data Form) */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <form action={action}>
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and academic info.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Avatar Upload Mock */}
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <div className="h-24 w-24 rounded-full bg-muted border-4 border-background shadow-sm flex items-center justify-center overflow-hidden">
                  <User className="h-10 w-10 text-muted-foreground opacity-50" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">Profile Photo</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">JPG, GIF or PNG. Max size of 2MB.</p>
                <Button type="button" variant="outline" size="sm" onClick={() => toast.info("Photo upload opened")}>
                  Upload New
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input name="name" defaultValue={user?.name || "Student Name"} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" defaultValue={user?.email || "student@example.com"} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input name="phone" type="tel" defaultValue={initialProfile?.phone || ""} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select name="department" value={department} onValueChange={setDepartment} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Academic Year</Label>
                <Select name="year" value={year} onValueChange={setYear} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-primary/5 rounded-xl border border-primary/10 mt-2">
                <div className="space-y-1">
                  <Label className="text-primary">Assigned Hostel</Label>
                  <p className="font-semibold text-foreground">
                    {hostel ? hostel.name : "Not Assigned"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-primary">Room Number</Label>
                  <p className="font-semibold text-foreground">
                    {room ? room.roomNumber : "Not Assigned"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t border-border/50 py-4 justify-end">
            <Button type="submit" disabled={loading} className="px-8">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* 2. Account & Security (Mock) */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Account & Security</CardTitle>
              <CardDescription>Update your password and secure your account.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
                <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
                <div className="h-1.5 flex-1 bg-muted rounded-full"></div>
                <div className="h-1.5 flex-1 bg-muted rounded-full"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Strength: Good. Add numbers or symbols to improve.</p>
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t border-border/50 py-4 justify-end">
          <Button variant="default" onClick={() => handleMockSave("Security")} className="px-8 bg-blue-600 hover:bg-blue-700">
            Update Password
          </Button>
        </CardFooter>
      </Card>

      {/* 3 & 4. Notifications and Privacy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Notifications */}
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose what alerts you receive.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Complaint Updates</Label>
                <p className="text-xs text-muted-foreground">When status changes.</p>
              </div>
              <Switch checked={notifications.complaints} onCheckedChange={(c) => setNotifications({...notifications, complaints: c})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Leave Requests</Label>
                <p className="text-xs text-muted-foreground">Approval notifications.</p>
              </div>
              <Switch checked={notifications.leaves} onCheckedChange={(c) => setNotifications({...notifications, leaves: c})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Visitor Approvals</Label>
                <p className="text-xs text-muted-foreground">When guests arrive.</p>
              </div>
              <Switch checked={notifications.visitors} onCheckedChange={(c) => setNotifications({...notifications, visitors: c})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Emergency Alerts</Label>
                <p className="text-xs text-destructive font-medium">Critical building alerts.</p>
              </div>
              <Switch checked={notifications.emergency} disabled />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Manage how others see your info.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Profile Visibility</Label>
                <p className="text-xs text-muted-foreground">Visible to roommates.</p>
              </div>
              <Switch checked={privacy.profileVisible} onCheckedChange={(c) => setPrivacy({...privacy, profileVisible: c})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Hide Phone Number</Label>
                <p className="text-xs text-muted-foreground">Keep number private.</p>
              </div>
              <Switch checked={privacy.hidePhone} onCheckedChange={(c) => setPrivacy({...privacy, hidePhone: c})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive weekly digests.</p>
              </div>
              <Switch checked={privacy.emailNotifications} onCheckedChange={(c) => setPrivacy({...privacy, emailNotifications: c})} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Session Management & 6. Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
              <CardTitle>Session Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <MonitorSmartphone className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <p className="font-medium">Windows PC • Chrome</p>
                <p className="text-xs text-emerald-500 font-semibold mt-0.5">Active Now • New York, US</p>
              </div>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-muted-foreground">
                <LogOut className="h-4 w-4 mr-2" /> Log Out of Current Session
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5">
                <LogOut className="h-4 w-4 mr-2" /> Log Out of All Devices
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                <HelpCircle className="h-5 w-5" />
              </div>
              <CardTitle>Support & Help</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Help Center & FAQs
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Contact Warden
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Report a Bug
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Send Feedback
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 7. Account Actions (Danger Zone) */}
      <Card className="border-destructive/30 shadow-sm overflow-hidden bg-destructive/5">
        <CardHeader className="border-b border-destructive/20">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Account Actions</CardTitle>
          </div>
          <CardDescription className="text-destructive/80">Proceed with caution. These actions cannot be easily undone.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <Button variant="outline" className="w-full sm:w-auto border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
            <Trash2 className="h-4 w-4 mr-2" /> Delete Account
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" /> Download My Data
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}
