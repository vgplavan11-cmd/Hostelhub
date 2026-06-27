"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LeaveRequestForm } from "./LeaveRequestForm"
import { Search } from "lucide-react"
import Link from "next/link"

export function LeavesTable({ leaves }: { leaves: any[] }) {
  const [search, setSearch] = useState("")

  const filteredLeaves = leaves.filter(l => 
    l.reason.toLowerCase().includes(search.toLowerCase()) || 
    l.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leaves..."
            className="pl-8 max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger render={<Button />}>Request Leave</DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Leave Request</DialogTitle></DialogHeader>
            <LeaveRequestForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reason</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested On</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaves.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="max-w-[200px] truncate">{l.reason}</TableCell>
                <TableCell>{l.startDate} to {l.endDate}</TableCell>
                <TableCell>
                  <Badge variant={l.status === 'approved' ? 'default' : l.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {l.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(l.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {l.status === 'approved' && (
                    <Link href={`/student/leaves/${l.id}/pass`} className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                      View Pass
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredLeaves.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center h-24">No leave requests found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
