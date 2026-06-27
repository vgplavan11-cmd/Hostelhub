import { VisitorRepository } from "@/lib/repositories/VisitorRepository"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { VisitorStatusDropdown } from "@/components/warden/VisitorStatusDropdown"
import { Badge } from "@/components/ui/badge"

export default async function WardenVisitorsPage() {
  const visitors = await VisitorRepository.findAll()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Visitors</h1>
        <p className="text-muted-foreground mt-2">Manage expected visitors and update their status.</p>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Visitor Name</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitors.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center">No visitors found.</TableCell></TableRow>
            ) : (
              visitors.map(visitor => (
                <TableRow key={visitor.id}>
                  <TableCell className="font-medium">{visitor.studentId}</TableCell>
                  <TableCell>{visitor.visitorName}</TableCell>
                  <TableCell>{visitor.relationship}</TableCell>
                  <TableCell>{new Date(visitor.visitDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={visitor.status === 'pending' ? 'secondary' : visitor.status === 'approved' ? 'default' : visitor.status === 'rejected' ? 'destructive' : 'outline'}>
                      {visitor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <VisitorStatusDropdown visitorId={visitor.id} currentStatus={visitor.status} />
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
