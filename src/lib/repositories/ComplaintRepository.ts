import { docClient } from "../db/dynamodb";
import { GetCommand, PutCommand, QueryCommand, UpdateCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_COMPLAINTS || "HostelHub-Complaints";

export interface Complaint {
  id: string;
  studentId: string; // Used for querying
  hostelId: string;
  category: "electrical" | "plumbing" | "internet" | "cleaning" | "security" | "other";
  description: string;
  status: "pending" | "in-progress" | "resolved";
  assignedTo?: string; // warden or staff ID
  createdAt: string;
  updatedAt: string;
}

export const ComplaintRepository = {
  async create(complaint: Omit<Complaint, "id" | "createdAt" | "updatedAt">): Promise<Complaint> {
    const newComplaint: Complaint = {
      ...complaint,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: newComplaint }));
    return newComplaint;
  },
  async findById(id: string): Promise<Complaint | null> {
    const res = await docClient.send(new GetCommand({ TableName: TABLE_NAME, Key: { id } }));
    return (res.Item as Complaint) || null;
  },
  async findAll(): Promise<Complaint[]> {
    const res = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    return (res.Items as Complaint[]) || [];
  },
  async findByStudent(studentId: string): Promise<Complaint[]> {
    const res = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "studentId = :sid",
      ExpressionAttributeValues: { ":sid": studentId }
    }));
    return (res.Items as Complaint[]) || [];
  },
  async updateStatus(id: string, status: Complaint["status"]): Promise<void> {
    await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "SET #st = :status, updatedAt = :updatedAt",
      ExpressionAttributeNames: { "#st": "status" },
      ExpressionAttributeValues: { ":status": status, ":updatedAt": new Date().toISOString() }
    }));
  },
  async updateAssignment(id: string, assigneeId: string): Promise<void> {
    await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "SET assignedTo = :assignee, updatedAt = :updatedAt",
      ExpressionAttributeValues: { ":assignee": assigneeId, ":updatedAt": new Date().toISOString() }
    }));
  },
  async delete(id: string): Promise<void> {
    await docClient.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
  }
};
