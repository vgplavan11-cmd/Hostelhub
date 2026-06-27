import { docClient } from "../db/dynamodb";
import { GetCommand, PutCommand, ScanCommand, QueryCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_ROOMS || "HostelHub-Rooms";

export interface Room {
  id: string;
  hostelId: string; // Used for querying
  roomNumber: string;
  capacity: number;
  occupants: string[]; // Array of student IDs
  status: "available" | "full" | "maintenance";
  createdAt: string;
}

export const RoomRepository = {
  async create(room: Omit<Room, "id" | "createdAt">): Promise<Room> {
    const newRoom: Room = {
      ...room,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: newRoom }));
    return newRoom;
  },
  async findById(id: string): Promise<Room | null> {
    const res = await docClient.send(new GetCommand({ TableName: TABLE_NAME, Key: { id } }));
    return (res.Item as Room) || null;
  },
  async findAll(): Promise<Room[]> {
    const res = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    return (res.Items as Room[]) || [];
  },
  async findByStudent(studentId: string): Promise<Room | null> {
    const res = await docClient.send(new ScanCommand({ 
      TableName: TABLE_NAME,
      FilterExpression: "contains(occupants, :sid)",
      ExpressionAttributeValues: { ":sid": studentId }
    }));
    return res.Items && res.Items.length > 0 ? (res.Items[0] as Room) : null;
  },
  // Requires GSI on hostelId
  async findByHostel(hostelId: string): Promise<Room[]> {
    const res = await docClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "HostelIndex",
      KeyConditionExpression: "hostelId = :hid",
      ExpressionAttributeValues: { ":hid": hostelId }
    }));
    return (res.Items as Room[]) || [];
  },
  async update(id: string, updates: Partial<Omit<Room, "id" | "createdAt" | "hostelId">>): Promise<void> {
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};
    const expressionAttributeNames: Record<string, string> = {};

    Object.entries(updates).forEach(([key, value]) => {
      // #st is used for 'status' because it's a reserved word in DynamoDB occasionally
      const attrName = key === 'status' ? '#st' : `#${key}`;
      updateExpressions.push(`${attrName} = :${key}`);
      expressionAttributeValues[`:${key}`] = value;
      expressionAttributeNames[attrName] = key;
    });

    if (updateExpressions.length === 0) return;

    await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    }));
  },
  async delete(id: string): Promise<void> {
    await docClient.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
  }
};
