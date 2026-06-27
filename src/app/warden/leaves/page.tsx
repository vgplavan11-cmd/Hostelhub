import { LeaveRequestRepository } from "@/lib/repositories/LeaveRequestRepository"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ApproveRejectButtons } from "@/components/warden/ApproveRejectButtons"

export default async function WardenLeavesPage() {
  const leaves = await LeaveRequestRepository.findAll()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Leave Requests</h1>
        <p className="text-muted-foreground mt-2">Manage student leave requests.</p>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaves.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center">No leave requests found.</TableCell></TableRow>
            ) : (
              leaves.map(leave => (
                <TableRow key={leave.id}>
                  <TableCell className="font-medium">{leave.studentId}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={leave.status === 'pending' ? 'secondary' : leave.status === 'approved' ? 'default' : 'destructive'}>
                      {leave.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {leave.status === 'pending' && (
                      <ApproveRejectButtons leaveId={leave.id} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
