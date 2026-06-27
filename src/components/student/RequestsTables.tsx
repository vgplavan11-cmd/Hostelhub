"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ComplaintForm } from "./ComplaintForm"
import { Search } from "lucide-react"

export function RequestsTables({ complaints }: { complaints: any[] }) {
  const [search, setSearch] = useState("")

  const filteredComplaints = complaints.filter(c => 
    c.description.toLowerCase().includes(search.toLowerCase()) || 
    c.status.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            className="pl-8 max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none h-10 gap-2 px-4 bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5">
            Submit Complaint
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Complaint</DialogTitle></DialogHeader>
            <ComplaintForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="capitalize font-medium">{c.category}</TableCell>
                <TableCell className="max-w-[300px] truncate">{c.description}</TableCell>
                <TableCell>
                  <Badge variant={c.status === "resolved" ? "default" : c.status === "pending" ? "secondary" : "destructive"}>
                    {c.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {filteredComplaints.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center h-24">No complaints found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
