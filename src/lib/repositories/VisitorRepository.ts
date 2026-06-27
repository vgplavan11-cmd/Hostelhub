import { docClient } from "../db/dynamodb";
import { GetCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_VISITORS || "HostelHub-Visitors";

export interface Visitor {
  id: string;
  studentId: string;
  visitorName: string;
  relationship: string;
  visitDate: string;
  status: "pending" | "approved" | "rejected" | "checked-in" | "checked-out";
  createdAt: string;
}

export const VisitorRepository = {
  async create(visitor: Omit<Visitor, "id" | "createdAt">): Promise<Visitor> {
    const newVisitor: Visitor = {
      ...visitor,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    try {
      await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: newVisitor }));
    } catch (e) {
      console.log("DynamoDB create error:", e);
    }
    return newVisitor;
  },
  async findAll(): Promise<Visitor[]> {
    try {
      const res = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
      return (res.Items as Visitor[]) || [];
    } catch (e) {
      console.log("DynamoDB findAll error:", e);
      return [];
    }
  },
  async findByStudent(studentId: string): Promise<Visitor[]> {
    // Ideally requires a GSI on studentId, but using Scan for MVP
    try {
      const res = await docClient.send(new ScanCommand({ 
        TableName: TABLE_NAME,
        FilterExpression: "studentId = :sid",
        ExpressionAttributeValues: { ":sid": studentId }
      }));
      return (res.Items as Visitor[]) || [];
    } catch (e) {
      console.log("DynamoDB findByStudent error:", e);
      return [];
    }
  },
  async findById(id: string): Promise<Visitor | null> {
    try {
      const res = await docClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { id }
      }));
      return (res.Item as Visitor) || null;
    } catch (e) {
      console.log("DynamoDB findById error:", e);
      return null;
    }
  },
  async updateStatus(id: string, status: Visitor["status"]): Promise<void> {
    try {
      await docClient.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "SET #st = :status",
        ExpressionAttributeNames: { "#st": "status" },
        ExpressionAttributeValues: { ":status": status }
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
