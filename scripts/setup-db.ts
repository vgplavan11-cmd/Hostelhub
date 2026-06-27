import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  }
});

const tablesToCreate = [
  {
    TableName: process.env.DYNAMODB_TABLE_USERS || "HostelHub-Users",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "EmailIndex",
        KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
      }
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
  },
  // We can define the rest of the tables similarly here
  // ...
];

async function setupDatabase() {
  console.log("Setting up DynamoDB tables...");
  for (const tableConfig of tablesToCreate) {
    try {
      const command = new CreateTableCommand(tableConfig as any);
      await client.send(command);
      console.log(`Table ${tableConfig.TableName} created successfully.`);
    } catch (error: any) {
      if (error.name === "ResourceInUseException") {
        console.log(`Table ${tableConfig.TableName} already exists.`);
      } else {
        console.error(`Error creating table ${tableConfig.TableName}:`, error);
      }
    }
  }
}

// setupDatabase();
