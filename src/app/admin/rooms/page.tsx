import { RoomRepository } from "@/lib/repositories/RoomRepository"
import { HostelRepository } from "@/lib/repositories/HostelRepository"
import { deleteRoom } from "@/app/actions/admin"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateRoomForm } from "@/components/admin/CreateRoomForm"
import { DeleteButton } from "@/components/admin/DeleteButton"
import { Badge } from "@/components/ui/badge"

export default async function AdminRoomsPage() {
  const rooms = await RoomRepository.findAll()
  const hostels = await HostelRepository.findAll()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Rooms Management</h1>
          <p className="text-muted-foreground mt-2">Manage rooms and occupancy.</p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none h-10 gap-2 px-4 bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5">
            Add Room
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Room</DialogTitle></DialogHeader>
            <CreateRoomForm hostels={hostels} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room Number</TableHead>
              <TableHead>Hostel ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center">No rooms found.</TableCell></TableRow>
            ) : (
              rooms.map(room => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.roomNumber}</TableCell>
                  <TableCell>{room.hostelId}</TableCell>
                  <TableCell>{room.capacity}-Seater</TableCell>
                  <TableCell>
                    <Badge variant={room.occupants.length >= room.capacity ? 'secondary' : 'default'}>
                      {room.occupants.length}/{room.capacity} Occupied
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteButton id={room.id} onDelete={deleteRoom} />
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
