"use server"

import { auth } from "@/lib/auth";
import { RoomRepository } from "@/lib/repositories/RoomRepository";
import { HostelRepository } from "@/lib/repositories/HostelRepository";
import { ComplaintRepository } from "@/lib/repositories/ComplaintRepository";
import { LeaveRequestRepository } from "@/lib/repositories/LeaveRequestRepository";
import { VisitorRepository } from "@/lib/repositories/VisitorRepository";
import { EmergencyAlertRepository } from "@/lib/repositories/EmergencyAlertRepository";
import { revalidatePath } from "next/cache";

// Helper to check student access
async function requireStudent() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "student") {
    throw new Error("Unauthorized: Student access required");
  }
  return session;
}

export async function submitComplaint(formData: FormData) {
  const session = await requireStudent();
  const category = formData.get("category") as any;
  const description = formData.get("description") as string;
  
  if (!category || !description) {
    throw new Error("Invalid input");
  }

  const room = await RoomRepository.findByStudent(session.user?.id as string);
  const hostelId = room?.hostelId || "unassigned";

  await ComplaintRepository.create({
    studentId: session.user?.id as string,
    hostelId,
    category,
    description,
    status: "pending",
  } as any);
  
  revalidatePath("/student/requests");
}

export async function submitLeaveRequest(formData: FormData) {
  const session = await requireStudent();
  const reason = formData.get("reason") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  
  if (!reason || !startDate || !endDate) {
    throw new Error("Invalid input");
  }

  const room = await RoomRepository.findByStudent(session.user?.id as string);
  const hostelId = room?.hostelId || "unassigned";

  await LeaveRequestRepository.create({
    studentId: session.user?.id as string,
    hostelId,
    reason,
    startDate,
    endDate,
  });
  
  revalidatePath("/student/requests");
}

export async function submitVisitorRequest(formData: FormData) {
  const session = await requireStudent();
  const visitorName = formData.get("visitorName") as string;
  const relationship = formData.get("relationship") as string;
  const visitDate = formData.get("visitDate") as string;
  
  if (!visitorName || !relationship || !visitDate) {
    throw new Error("Invalid input");
  }

  await VisitorRepository.create({
    studentId: session.user?.id as string,
    visitorName,
    relationship,
    visitDate,
    status: "pending",
  });
  
  revalidatePath("/student/requests");
}

export async function triggerEmergencyAlert(type: "fire" | "medical" | "security" | "other", message: string) {
  const session = await requireStudent();
  
  await EmergencyAlertRepository.create({
    type,
    message,
    reportedBy: session.user?.id as string,
  });
  
  revalidatePath("/student");
}

export async function getStudentDetails() {
  const session = await requireStudent();
  const studentId = session.user?.id as string;
  
  const room = await RoomRepository.findByStudent(studentId);
  let hostel = null;
  
  if (room && room.hostelId) {
    hostel = await HostelRepository.findById(room.hostelId);
  }
  
  return {
    user: session.user,
    room,
    hostel,
  };
}

export async function updateStudentProfile(formData: FormData) {
  const session = await requireStudent();
  const department = formData.get("department") as string;
  const year = formData.get("year") as string;
  const phone = formData.get("phone") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const quietRoom = formData.get("quietRoom") === "on";
  const studyFocused = formData.get("studyFocused") === "on";

  if (!department || !year) {
    throw new Error("Department and Year are required.");
  }

  // Use any to bypass TS compilation if UserRepository update isn't strictly typed for nested profile
  const updates: any = {
    profile: {
      department,
      year,
      phone,
      quietRoom,
      studyFocused,
    }
  };
  if (name) updates.name = name;
  if (email) updates.email = email;

  const { UserRepository } = await import("@/lib/repositories/UserRepository");
  await UserRepository.update(session.user?.id as string, updates);

  revalidatePath("/student/settings");
}
