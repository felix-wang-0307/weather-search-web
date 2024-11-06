import { Db, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

class MongoDbClient {
  client: MongoClient;
  database: Db;
  constructor(dbName = "weather") {
    this.client = new MongoClient(MONGODB_URI);
    this.connect().then(() => {
      console.log("Connected to MongoDB");
    });
    this.database = this.client.db(dbName);
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async close(): Promise<void> {
    await this.client.close();
    console.log("Closing MongoDB connection...");
  }
}

export const client = new MongoDbClient();
