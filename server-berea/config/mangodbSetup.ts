import { MongoClient } from "mongodb";

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL ?? "mongodb://localhost:27017";

const client = new MongoClient(DB_CONNECTION_URL);
export default client;