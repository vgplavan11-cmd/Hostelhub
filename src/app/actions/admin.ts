"use server"

import { auth } from "@/lib/auth";
import { HostelRepository, Hostel } from "@/lib/repositories/HostelRepository";
import { RoomRepository, Room } from "@/lib/repositories/RoomRepository";
import { UserRepository, User } from "@/lib/repositories/UserRepository";
import { NoticeRepository, Notice } from "@/lib/repositories/NoticeRepository";
import { ComplaintRepository } from "@/lib/repositories/ComplaintRepository";
import { LeaveRequestRepository } from "@/lib/repositories/LeaveRequestRepository";
import { revalidatePath } from "next/cache";

// Helper to check admin access
async function requireAdmin() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
  return session;
}

export async function createHostel(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const capacity = parseInt(formData.get("capacity") as string, 10);
  
  if (!name || !address || isNaN(capacity)) {
    throw new Error("Invalid input");
  }

  await HostelRepository.create({ name, address, capacity });
  revalidatePath("/admin/hostels");
}

export async function createRoom(formData: FormData) {
  await requireAdmin();
  const hostelId = formData.get("hostelId") as string;
  const roomNumber = formData.get("roomNumber") as string;
  const capacity = parseInt(formData.get("capacity") as string, 10);
  
  if (!hostelId || !roomNumber || isNaN(capacity)) {
    throw new Error("Invalid input");
  }

  await RoomRepository.create({
    hostelId,
    roomNumber,
    capacity,
    occupants: [],
    status: "available",
  });
  revalidatePath("/admin/rooms");
}

export async function createUser(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "warden" | "student";
  
  if (!name || !email || !role) {
    throw new Error("Invalid input");
  }

  await UserRepository.create({
    name,
    email,
    role,
    passwordHash: "password", // Default password for newly created accounts
  });
  revalidatePath("/admin/users");
}

export async function createNotice(formData: FormData) {
  const session = await requireAdmin();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  
  if (!title || !content) {
    throw new Error("Invalid input");
  }

  await NoticeRepository.create({
    title,
    content,
    authorId: session.user?.id || "admin",
  });
  revalidatePath("/admin/notices");
}

export async function allocateRoom(formData: FormData) {
  await requireAdmin();
  const studentId = formData.get("studentId") as string;
  const roomId = formData.get("roomId") as string;
  
  if (!studentId || !roomId) {
    throw new Error("Invalid input");
  }

  const existingRoom = await RoomRepository.findByStudent(studentId);
  if (existingRoom) {
    throw new Error("Student is already allocated to a room.");
  }

  const room = await RoomRepository.findById(roomId);
  if (!room) throw new Error("Room not found");
  if (room.occupants.length >= room.capacity) throw new Error("Room is full");

  const newOccupants = [...(room.occupants || []), studentId];
  
  await RoomRepository.update(roomId, { 
    occupants: newOccupants, 
    status: newOccupants.length >= room.capacity ? "full" : "available" 
  });
  
  revalidatePath("/admin/rooms");
}

export async function getDashboardStats() {
  await requireAdmin();
  
  const [users, rooms, complaints, leaves] = await Promise.all([
    UserRepository.findAll(),
    RoomRepository.findAll(),
    ComplaintRepository.findAll(),
    LeaveRequestRepository.findAll(),
  ]);

  const students = users.filter(u => u.role === "student");
  const wardens = users.filter(u => u.role === "warden");
  
  const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const currentOccupancy = rooms.reduce((acc, r) => acc + (r.occupants?.length || 0), 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((currentOccupancy / totalCapacity) * 100) : 0;

  return {
    totalStudents: students.length,
    totalWardens: wardens.length,
    totalRooms: rooms.length,
    occupancyRate,
    activeComplaints: complaints.filter(c => c.status !== "resolved").length,
    pendingLeaves: leaves.filter(l => l.status === "pending").length,
  };
}

export async function deleteNotice(id: string) {
  await requireAdmin();
  await NoticeRepository.delete(id);
  revalidatePath("/admin/notices");
}

export async function deleteVisitor(id: string) {
  await requireAdmin();
  const { VisitorRepository } = await import("@/lib/repositories/VisitorRepository");
  await VisitorRepository.delete(id);
  revalidatePath("/admin/visitors");
  revalidatePath("/warden/visitors");
}

export async function deleteLeaveRequest(id: string) {
  await requireAdmin();
  await LeaveRequestRepository.delete(id);
  revalidatePath("/admin/leaves");
  revalidatePath("/warden/leaves");
}

export async function deleteComplaint(id: string) {
  await requireAdmin();
  await ComplaintRepository.delete(id);
  revalidatePath("/admin/complaints");
  revalidatePath("/warden/complaints");
}

export async function deleteUser(id: string) {
  await requireAdmin();
  await UserRepository.delete(id);
  revalidatePath("/admin/users");
}

export async function deleteHostel(id: string) {
  await requireAdmin();
  await HostelRepository.delete(id);
  revalidatePath("/admin/hostels");
}

export async function deleteRoom(id: string) {
  await requireAdmin();
  await RoomRepository.delete(id);
  revalidatePath("/admin/rooms");
}
