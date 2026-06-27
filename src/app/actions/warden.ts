"use server"

import { auth } from "@/lib/auth";
import { ComplaintRepository } from "@/lib/repositories/ComplaintRepository";
import { LeaveRequestRepository } from "@/lib/repositories/LeaveRequestRepository";
import { VisitorRepository } from "@/lib/repositories/VisitorRepository";
import { EmergencyAlertRepository } from "@/lib/repositories/EmergencyAlertRepository";
import { NoticeRepository } from "@/lib/repositories/NoticeRepository";
import { revalidatePath } from "next/cache";

async function requireWarden() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "warden") {
    throw new Error("Unauthorized: Warden access required");
  }
  return session;
}

export async function updateComplaintStatus(complaintId: string, status: any) {
  await requireWarden();
  await ComplaintRepository.updateStatus(complaintId, status);
  revalidatePath("/warden/complaints");
}

export async function assignComplaint(complaintId: string, assigneeId: string) {
  await requireWarden();
  await ComplaintRepository.updateAssignment(complaintId, assigneeId);
  revalidatePath("/warden/complaints");
}

export async function updateLeaveStatus(leaveId: string, status: any) {
  await requireWarden();
  await LeaveRequestRepository.updateStatus(leaveId, status);
  revalidatePath("/warden/leaves");
}

export async function updateVisitorStatus(visitorId: string, status: any) {
  await requireWarden();
  await VisitorRepository.updateStatus(visitorId, status);
  revalidatePath("/warden/visitors");
}

export async function resolveEmergencyAlert(alertId: string) {
  await requireWarden();
  await EmergencyAlertRepository.updateStatus(alertId, "resolved");
  revalidatePath("/warden");
}

export async function createNotice(formData: FormData) {
  const session = await requireWarden();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  
  if (!title || !content) {
    throw new Error("Invalid input");
  }

  await NoticeRepository.create({
    title,
    content,
    authorId: session.user?.id as string,
  });
  
  revalidatePath("/warden/notices");
}

export async function deleteNoticeWarden(id: string) {
  await requireWarden();
  await NoticeRepository.delete(id);
  revalidatePath("/warden/notices");
}

export async function deleteVisitorWarden(id: string) {
  await requireWarden();
  await VisitorRepository.delete(id);
  revalidatePath("/warden/visitors");
}

export async function deleteLeaveRequestWarden(id: string) {
  await requireWarden();
  await LeaveRequestRepository.delete(id);
  revalidatePath("/warden/leaves");
}

export async function deleteComplaintWarden(id: string) {
  await requireWarden();
  await ComplaintRepository.delete(id);
  revalidatePath("/warden/complaints");
}

export async function updateWardenProfile(formData: FormData) {
  const session = await requireWarden();
  
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const officeHours = formData.get("officeHours") as string;
  
  const updates: any = {};
  
  if (firstName || lastName) {
    updates.name = `${firstName || ""} ${lastName || ""}`.trim();
  }
  if (email) updates.email = email;
  
  updates.profile = {
    phone,
    officeHours
  };

  const { UserRepository } = await import("@/lib/repositories/UserRepository");
  await UserRepository.update(session.user?.id as string, updates);
  
  revalidatePath("/warden/settings");
}
