"use client"

import { useState, useMemo } from "react"
import { allocateRoom } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { User } from "@/lib/repositories/UserRepository"
import { Room } from "@/lib/repositories/RoomRepository"

export function AllocateRoomForm({ students, rooms }: { students: User[], rooms: Room[] }) {
  const [loading, setLoading] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState<string>("")

  // Filter for available rooms
  const availableRooms = rooms.filter(room => room.status === "available" || room.status === undefined || (room.occupants && room.occupants.length < room.capacity));

  // Compute room matching scores when a student is selected
  const scoredRooms = useMemo(() => {
    if (!selectedStudentId) return availableRooms.map(r => ({ ...r, score: 0, isRecommended: false }));
    
    const selectedStudent = students.find(s => s.id === selectedStudentId);
    if (!selectedStudent || !selectedStudent.profile) {
      // If student has no profile, no scoring applied
      return availableRooms.map(r => ({ ...r, score: 0, isRecommended: false }));
    }

    const sProfile = selectedStudent.profile;

    const scored = availableRooms.map(room => {
      const occupants = room.occupants || [];
      if (occupants.length === 0) {
        // Empty room is a 100% match by default
        return { ...room, score: 100, isRecommended: false };
      }

      // Calculate average match with current occupants
      let totalMatch = 0;
      occupants.forEach(occId => {
        const occUser = students.find(s => s.id === occId);
        if (occUser && occUser.profile) {
          let score = 0;
          if (occUser.profile.department === sProfile.department) score += 25;
          if (occUser.profile.year === sProfile.year) score += 25;
          if (occUser.profile.quietRoom === sProfile.quietRoom) score += 25;
          if (occUser.profile.studyFocused === sProfile.studyFocused) score += 25;
          totalMatch += score;
        } else {
          // If occupant has no profile, assume neutral 50% match
          totalMatch += 50;
        }
      });

      const avgScore = totalMatch / occupants.length;
      return { ...room, score: avgScore, isRecommended: false };
    });

    // Sort by highest score first
    scored.sort((a, b) => b.score - a.score);

    // Mark highest as recommended if score > 0
    if (scored.length > 0) {
      scored[0].isRecommended = true;
    }

    return scored;
  }, [availableRooms, selectedStudentId, students]);

  async function action(formData: FormData) {
    setLoading(true)
    try {
      await allocateRoom(formData)
      toast.success("Room allocated successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to allocate room")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="studentId">Student</Label>
        <Select name="studentId" required onValueChange={(val) => { if (typeof val === "string") setSelectedStudentId(val); }}>
          <SelectTrigger>
            <SelectValue placeholder="Select a student" />
          </SelectTrigger>
          <SelectContent>
            {students.length === 0 && <SelectItem value="none" disabled>No students found</SelectItem>}
            {students.map(student => (
              <SelectItem key={student.id} value={student.id}>
                {student.name} {student.profile ? "✓ (Has Prefs)" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="roomId">Room Allocation</Label>
        <Select name="roomId" required disabled={!selectedStudentId}>
          <SelectTrigger>
            <SelectValue placeholder={selectedStudentId ? "Select the best room" : "Select a student first"} />
          </SelectTrigger>
          <SelectContent>
            {scoredRooms.length === 0 && <SelectItem value="none" disabled>No available rooms</SelectItem>}
            {scoredRooms.map(room => (
              <SelectItem key={room.id} value={room.id}>
                <div className="flex items-center justify-between w-full">
                  <span>Room {room.roomNumber} ({room.occupants?.length || 0}/{room.capacity} occupied)</span>
                  {selectedStudentId && (
                    <span className="ml-2 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {room.score.toFixed(0)}% Match
                    </span>
                  )}
                  {room.isRecommended && selectedStudentId && (
                    <span className="ml-2 text-xs font-bold text-green-600 uppercase tracking-wider">
                      Recommended
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedStudentId && (
           <p className="text-xs text-muted-foreground pt-1">
             Rooms are automatically sorted by match score based on student preferences.
           </p>
        )}
      </div>

      <Button type="submit" disabled={loading || availableRooms.length === 0 || students.length === 0} className="w-full">
        {loading ? "Allocating..." : "Allocate Room"}
      </Button>
    </form>
  )
}

