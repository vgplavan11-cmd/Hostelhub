import { UserRepository } from "@/lib/repositories/UserRepository"
import { RoomRepository } from "@/lib/repositories/RoomRepository"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function WardenStudentsPage() {
  const users = await UserRepository.findAll()
  const students = users.filter(u => u.role === "student")
  
  const rooms = await RoomRepository.findAll()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Students</h1>
        <p className="text-muted-foreground mt-2">Manage students and room assignments.</p>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center">No students found.</TableCell></TableRow>
            ) : (
              students.map(student => {
                const assignedRoom = rooms.find(r => r.occupants && r.occupants.includes(student.id))
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.profile?.department || 'N/A'}</TableCell>
                    <TableCell>
                      {assignedRoom ? (
                        <Badge variant="default">{assignedRoom.roomNumber}</Badge>
                      ) : (
                        <Badge variant="secondary">Unassigned</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
