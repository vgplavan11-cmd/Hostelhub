import { auth } from "@/lib/auth"
import { UserRepository } from "@/lib/repositories/UserRepository"
import { ComplaintRepository } from "@/lib/repositories/ComplaintRepository"
import { LeaveRequestRepository } from "@/lib/repositories/LeaveRequestRepository"
import { VisitorRepository } from "@/lib/repositories/VisitorRepository"
import { EmergencyAlertRepository } from "@/lib/repositories/EmergencyAlertRepository"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, Calendar, UserCheck, AlertTriangle, ArrowUpRight } from "lucide-react"
import { ResolveAlertButton } from "@/components/warden/ResolveAlertButton"

export default async function WardenOverview() {
  const session = await auth()
  
  const [users, complaints, leaves, visitors, alerts] = await Promise.all([
    UserRepository.findAll(),
    ComplaintRepository.findAll(),
    LeaveRequestRepository.findAll(),
    VisitorRepository.findAll(),
    EmergencyAlertRepository.findActive()
  ])

  const students = users.filter(u => u.role === "student")
  const activeComplaints = complaints.filter(c => c.status !== "resolved")
  const pendingLeaves = leaves.filter(l => l.status === "pending")
  const expectedVisitors = visitors.filter(v => v.status === "approved")

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Warden Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {session?.user?.name}. Here is your daily overview.</p>
      </div>

      {alerts.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-5 shadow-sm">
          <div className="flex items-center text-destructive font-bold mb-4">
            <AlertTriangle className="mr-2 h-5 w-5 animate-pulse" />
            ACTIVE EMERGENCY ALERTS ({alerts.length})
          </div>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="bg-background p-4 rounded-lg shadow-sm border border-border flex justify-between items-center transition-all hover:shadow-md">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive uppercase tracking-wider mb-2">
                    {alert.type}
                  </span>
                  <p className="font-medium">{alert.message}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    Reported by: {alert.reportedBy} • {new Date(alert.createdAt).toLocaleString()}
                  </div>
                </div>
                <ResolveAlertButton alertId={alert.id} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Students Card */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{students.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In your jurisdiction</p>
          </CardContent>
        </Card>
        
        {/* Active Complaints Card */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-destructive/5 rounded-bl-full" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Complaints</CardTitle>
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center z-10">
              <MessageSquare className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-bold text-foreground">{activeComplaints.length}</div>
            <p className="text-xs text-destructive font-medium flex items-center mt-1">
              Needs review <ArrowUpRight className="h-3 w-3 ml-1" />
            </p>
          </CardContent>
        </Card>

        {/* Pending Leaves Card */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Leaves</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{pendingLeaves.length}</div>
            <p className="text-xs text-amber-500 font-medium mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        {/* Expected Visitors Card */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expected Visitors</CardTitle>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{expectedVisitors.length}</div>
            <p className="text-xs text-emerald-500 font-medium mt-1">Approved for today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
