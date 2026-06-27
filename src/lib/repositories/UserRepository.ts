import { docClient } from "../db/dynamodb";
import { GetCommand, PutCommand, QueryCommand, UpdateCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMODB_TABLE_USERS || "HostelHub-Users";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash?: string; // Should be hashed in production!
  role: "admin" | "warden" | "student";
  profile?: {
    department: string;
    year: string;
    quietRoom: boolean;
    studyFocused: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export const UserRepository = {
  async create(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: newUser,
    });
    
    await docClient.send(command);
    return newUser;
  },

  async findById(id: string): Promise<User | null> {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });

    try {
      const response = await docClient.send(command);
      if (response.Item) {
        return response.Item as User;
      }
    } catch (e) {
      console.log("DynamoDB findById error:", e);
    }
    
    // MOCK FALLBACK for development test accounts
    if (id === "1") return { id: "1", name: "Admin User", email: "admin@test.com", role: "admin", createdAt: "", updatedAt: "" };
    if (id === "2") return { id: "2", name: "Warden User", email: "warden@test.com", role: "warden", createdAt: "", updatedAt: "" };
    if (id === "3") return { id: "3", name: "Student User", email: "student@test.com", role: "student", createdAt: "", updatedAt: "" };

    return null;
  },

  async findAll(): Promise<User[]> {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await docClient.send(command);
    return (response.Items as User[]) || [];
  },

  async findByEmail(email: string): Promise<User | null> {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    });

    const response = await docClient.send(command);
    return response.Items && response.Items.length > 0 ? (response.Items[0] as User) : null;
  },

  async update(id: string, updates: Partial<Omit<User, "id" | "createdAt" | "email">>): Promise<void> {
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};
    const expressionAttributeNames: Record<string, string> = {};

    Object.entries(updates).forEach(([key, value]) => {
      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeValues[`:${key}`] = value;
      expressionAttributeNames[`#${key}`] = key;
    });

    updateExpressions.push("#updatedAt = :updatedAt");
    expressionAttributeValues[":updatedAt"] = new Date().toISOString();
    expressionAttributeNames["#updatedAt"] = "updatedAt";

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    await docClient.send(command);
  },

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });
    await docClient.send(command);
  }
};
