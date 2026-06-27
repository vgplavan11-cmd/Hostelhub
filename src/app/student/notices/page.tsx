import { NoticeRepository } from "@/lib/repositories/NoticeRepository"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

export default async function NoticesPage() {
  const notices = await NoticeRepository.findAll()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Notices</h1>
        <p className="text-muted-foreground mt-2">Important announcements from the administration.</p>
      </div>
      
      <div className="grid gap-4">
        {notices.map((notice) => (
          <Card key={notice.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                {notice.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{notice.content}</p>
              <div className="mt-4 text-xs text-muted-foreground/70">
                Posted on: {new Date(notice.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
        {notices.length === 0 && (
          <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
            No notices at this time.
          </div>
        )}
      </div>
    </div>
  )
}
