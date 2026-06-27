import { docClient } from "../db/dynamodb";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_NOTICES || "HostelHub-Notices";

export interface Notice {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export const NoticeRepository = {
  async create(notice: Omit<Notice, "id" | "createdAt">): Promise<Notice> {
    const newNotice: Notice = {
      ...notice,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: newNotice }));
    return newNotice;
  },
  async findAll(): Promise<Notice[]> {
    const res = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    return (res.Items as Notice[]) || [];
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
