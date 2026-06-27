import { docClient } from "../db/dynamodb";
import { GetCommand, PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_HOSTELS || "HostelHub-Hostels";

export interface Hostel {
  id: string;
  name: string;
  address: string;
  capacity: number;
  wardenId?: string;
  createdAt: string;
  updatedAt: string;
}

export const HostelRepository = {
  async create(hostel: Omit<Hostel, "id" | "createdAt" | "updatedAt">): Promise<Hostel> {
    const newHostel: Hostel = {
      ...hostel,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: newHostel }));
    return newHostel;
  },
  async findById(id: string): Promise<Hostel | null> {
    const res = await docClient.send(new GetCommand({ TableName: TABLE_NAME, Key: { id } }));
    return (res.Item as Hostel) || null;
  },
  async findAll(): Promise<Hostel[]> {
    const res = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    return (res.Items as Hostel[]) || [];
  },
  async delete(id: string): Promise<void> {
    await docClient.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
  }
};
