import { docClient } from "../db/dynamodb";
import { GetCommand, PutCommand, QueryCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_LEAVES || "HostelHub-LeaveRequests";

export interface LeaveRequest {
  id: string;
  studentId: string; // Used for querying
  hostelId: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export const LeaveRequestRepository = {
  async create(leave: Omit<LeaveRequest, "id" | "createdAt" | "updatedAt" | "status">): Promise<LeaveRequest> {
    const newLeave: LeaveRequest = {
      ...leave,
      id: uuidv4(),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: newLeave }));
    } catch (e) {
      console.log("DynamoDB create error:", e);
    }
    return newLeave;
  },
  async findAll(): Promise<LeaveRequest[]> {
    try {
      const res = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
      return (res.Items as LeaveRequest[]) || [];
    } catch (e) {
      console.log("DynamoDB findAll error:", e);
      return [];
    }
  },
  async findByStudent(studentId: string): Promise<LeaveRequest[]> {
    try {
      const res = await docClient.send(new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "studentId = :sid",
        ExpressionAttributeValues: { ":sid": studentId }
      }));
      return (res.Items as LeaveRequest[]) || [];
    } catch (e) {
      console.log("DynamoDB findByStudent error:", e);
      return [];
    }
  },
  async findById(id: string): Promise<LeaveRequest | null> {
    try {
      const res = await docClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { id }
      }));
      return (res.Item as LeaveRequest) || null;
    } catch (e) {
      console.log("DynamoDB findById error:", e);
      return null;
    }
  },
  async updateStatus(id: string, status: LeaveRequest["status"]): Promise<void> {
    try {
      await docClient.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "SET #st = :status, updatedAt = :updatedAt",
        ExpressionAttributeNames: { "#st": "status" },
        ExpressionAttributeValues: {
          ":status": status,
          ":updatedAt": new Date().toISOString()
        }
      }));
    } catch (e) {
      console.log("DynamoDB updateStatus error:", e);
    }
  },
  async delete(id: string): Promise<void> {
    try {
      const { DeleteCommand } = await import("@aws-sdk/lib-dynamodb");
      await docClient.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
    } catch (e) {
      console.log("DynamoDB delete error:", e);
    }
  }
};
