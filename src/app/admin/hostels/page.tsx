import { HostelRepository } from "@/lib/repositories/HostelRepository"
import { deleteHostel } from "@/app/actions/admin"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateHostelForm } from "@/components/admin/CreateHostelForm"
import { DeleteButton } from "@/components/admin/DeleteButton"

export default async function AdminHostelsPage() {
  const hostels = await HostelRepository.findAll()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Hostels Management</h1>
          <p className="text-muted-foreground mt-2">Manage hostel buildings and details.</p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none h-10 gap-2 px-4 bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5">
            Add Hostel
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Hostel</DialogTitle></DialogHeader>
            <CreateHostelForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hostel Name</TableHead>
              <TableHead>Warden ID</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hostels.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center">No hostels found.</TableCell></TableRow>
            ) : (
              hostels.map(hostel => (
                <TableRow key={hostel.id}>
                  <TableCell className="font-medium">{hostel.name}</TableCell>
                  <TableCell>{hostel.wardenId || 'Unassigned'}</TableCell>
                  <TableCell>{hostel.capacity}</TableCell>
                  <TableCell className="text-right">
                    <DeleteButton id={hostel.id} onDelete={deleteHostel} />
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
