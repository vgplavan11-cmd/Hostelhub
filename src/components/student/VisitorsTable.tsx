"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { VisitorForm } from "./VisitorForm"
import { Search } from "lucide-react"

export function VisitorsTable({ visitors }: { visitors: any[] }) {
  const [search, setSearch] = useState("")

  const filteredVisitors = visitors.filter(v => 
    v.visitorName.toLowerCase().includes(search.toLowerCase()) || 
    v.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search visitors..."
            className="pl-8 max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none h-10 gap-2 px-4 bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5">
            Register Visitor
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Visitor Registration</DialogTitle></DialogHeader>
            <VisitorForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor Name</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Visit Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">{v.visitorName}</TableCell>
                <TableCell>{v.relationship}</TableCell>
                <TableCell>{new Date(v.visitDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={v.status === 'checked-in' || v.status === 'approved' ? 'default' : v.status === 'checked-out' ? 'outline' : v.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {v.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {(v.status === 'approved' || v.status === 'checked-in') && (
                    <Link href={`/student/visitors/${v.id}/pass`} className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                      View Pass
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredVisitors.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center h-24">No visitors found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
