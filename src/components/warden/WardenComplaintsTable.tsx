"use client"

import { useState } from "react"
import { Complaint } from "@/lib/repositories/ComplaintRepository"
import { User } from "@/lib/repositories/UserRepository"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusDropdown } from "@/components/warden/StatusDropdown"
import { AssignDropdown } from "@/components/warden/AssignDropdown"
import { Badge } from "@/components/ui/badge"

interface Props {
  complaints: Complaint[];
  users: User[];
  staffList: User[];
}

export function WardenComplaintsTable({ complaints, users, staffList }: Props) {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredComplaints = complaints.filter(c => {
    const student = users.find(u => u.id === c.studentId)
    const matchesSearch = c.description.toLowerCase().includes(search.toLowerCase()) || 
                          (student?.name.toLowerCase().includes(search.toLowerCase()))
    
    const matchesCategory = categoryFilter === "all" || c.category === categoryFilter
    const matchesStatus = statusFilter === "all" || c.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input 
          placeholder="Search complaints..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-xs"
        />
        <Select value={categoryFilter} onValueChange={(val) => { if(typeof val === "string") setCategoryFilter(val); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="internet">Internet / Wi-Fi</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(val) => { if(typeof val === "string") setStatusFilter(val); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In-Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((c) => {
              const student = users.find(u => u.id === c.studentId)
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{student?.name || "Unknown"}</TableCell>
                  <TableCell className="capitalize">
                    <Badge variant="outline">{c.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{c.description}</TableCell>
                  <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <AssignDropdown 
                      complaintId={c.id} 
                      currentAssigneeId={c.assignedTo} 
                      staffList={staffList} 
                    />
                  </TableCell>
                  <TableCell>
                    <StatusDropdown complaintId={c.id} currentStatus={c.status} />
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredComplaints.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No complaints found matching criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
