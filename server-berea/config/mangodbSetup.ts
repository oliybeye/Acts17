import { MongoClient } from "mongodb";

const hostName = 'localhost';
const port = 27017;
const url = `mongodb://${hostName}:${port}`;

const client = new MongoClient(url);
export default client;