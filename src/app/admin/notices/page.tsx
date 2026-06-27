import { NoticeRepository } from "@/lib/repositories/NoticeRepository"
import { deleteNotice } from "@/app/actions/admin"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateNoticeForm } from "@/components/admin/CreateNoticeForm"
import { DeleteButton } from "@/components/admin/DeleteButton"

export default async function AdminNoticesPage() {
  const notices = await NoticeRepository.findAll()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notices Management</h1>
          <p className="text-muted-foreground mt-2">Manage announcements across the platform.</p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none h-10 gap-2 px-4 bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5">
            Create Notice
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Notice</DialogTitle></DialogHeader>
            <CreateNoticeForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center">No notices found.</TableCell></TableRow>
            ) : (
              notices.map(notice => (
                <TableRow key={notice.id}>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>{notice.authorId}</TableCell>
                  <TableCell>{new Date(notice.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DeleteButton id={notice.id} onDelete={deleteNotice} />
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
