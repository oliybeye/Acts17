import client from "../config/mangodbSetup";
import { ObjectId } from "mongodb";
import { Comment } from "./../models/db";
import { updateCache } from "../caching";

interface DbParams {
  dbName: string;
  collectionName: string;
  filter: {};
}

export async function QueryDB(props: DbParams) {
  const { dbName, collectionName, filter } = props;
  try {
    await client.connect();
    const db = client.db(dbName);
    const news = db
      .collection(collectionName)
      .find(filter)
      .sort({ _id: -1 })
      .toArray();
    return news;
  } catch (error) {
    return error;
  }
}

interface InsertCommentPrams {
  dbName: string;
  parentCommentId: string;
  comment: string;
  userId: string;
}

export async function InsertCommentDB(prams: InsertCommentPrams) {
  const { dbName, parentCommentId, userId, comment } = prams;
  const collectionName = "comments";

  const commentObj = {
    _id: new ObjectId(),
    comment,
    userId,
    parentCommentId,
    like: 0,
    dislike: 0,
    timestamp: new Date().toUTCString(),
  } as Comment;

  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection(collectionName).insertOne(commentObj);
    return 0;
  } catch (error) {
    return 1;
  }
}

interface IncrementLikeCountPrams {
  dbName: string;
  collectionName: string;
  userId: string;
  id: string;
  likeCount: number;
}

export async function IncrementLikeCount(prams: IncrementLikeCountPrams) {
  const { dbName, collectionName, id, likeCount } = prams;
  try {
    await client.connect();
    const db = client.db(dbName);
    await db
      .collection(collectionName)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { like: likeCount + 1 } },
        { upsert: true }
      );
    updateCache();
    return 0;
  } catch (error) {
    console.log(`error: ${JSON.stringify(error)}`);
    return 1;
  }
}

interface IncrementDislikeCountPrams {
  dbName: string;
  collectionName: string;
  userId: string;
  id: string;
  dislikeCount: number;
}

export async function IncrementDislikeCount(prams: IncrementDislikeCountPrams) {
  const { dbName, collectionName, id, dislikeCount } = prams;
  try {
    await client.connect();
    const db = client.db(dbName);
    await db
      .collection(collectionName)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { dislike: dislikeCount + 1 } }
      );
    return 0;
  } catch (error) {
    return 1;
  }
}

export const DB_NAME = "unsalted";
export const DB_METADATA_COLLECTION = "metadata";
export const DB_COMMENT_COLLECTION = "comments";
export const DB_Election_DB = "waGENERALNov2023";
