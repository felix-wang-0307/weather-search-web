import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
class MongoDbClient {
  client: MongoClient;
  database: Db;
  isConnected: boolean = false;

  constructor(dbName = "weather") {
    this.client = new MongoClient(MONGODB_URI);
    this.connect().then(() => {
      console.log("Connected to MongoDB");
      this.isConnected = true;
    }).catch((err) => {
      console.error(err);
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

const client = new MongoDbClient();
export { client };