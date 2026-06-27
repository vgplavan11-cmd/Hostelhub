import { docClient } from "../db/dynamodb";
import { PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_ALERTS || "HostelHub-EmergencyAlerts";

export interface EmergencyAlert {
  id: string;
  type: "fire" | "medical" | "security" | "other";
  message: string;
  reportedBy: string; // studentId or wardenId
  status: "active" | "resolved";
  createdAt: string;
}

export const EmergencyAlertRepository = {
  async create(alert: Omit<EmergencyAlert, "id" | "createdAt" | "status">): Promise<EmergencyAlert> {
    const newAlert: EmergencyAlert = {
      ...alert,
      id: uuidv4(),
      status: "active",
      createdAt: new Date().toISOString(),
    };
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: newAlert }));
    return newAlert;
  },
  async findActive(): Promise<EmergencyAlert[]> {
    // In production, use Query on a GSI for status='active' instead of Scan
    const res = await docClient.send(new ScanCommand({ 
      TableName: TABLE_NAME,
      FilterExpression: "#st = :status",
      ExpressionAttributeNames: { "#st": "status" },
      ExpressionAttributeValues: { ":status": "active" }
    }));
    return (res.Items as EmergencyAlert[]) || [];
  },
  async updateStatus(id: string, status: EmergencyAlert["status"]): Promise<void> {
    await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "SET #st = :status",
      ExpressionAttributeNames: { "#st": "status" },
      ExpressionAttributeValues: { ":status": status }
    }));
  }
};
