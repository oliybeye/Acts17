import {
  CommentMutationInput,
  IncrementDislikeInput,
  IncrementLikeInput,
} from "../models/graphql";
import {
  DB_NAME,
  IncrementDislikeCount,
  IncrementLikeCount,
  InsertCommentDB,
} from "../utils/dbAccesor";

export const createComment = async (input: CommentMutationInput) => {
  const insertComment = await InsertCommentDB({
    dbName: DB_NAME,
    parentCommentId: input.id!,
    comment: input.comment!,
    userId: input.userId!,
  });
  return insertComment;
};

export const incrementLike = async (input: IncrementLikeInput) => {
  const increment = await IncrementLikeCount({
    dbName: DB_NAME,
    collectionName: input.type,
    id: input.id,
    likeCount: input.likeCount,
    userId: input.userId!,
  });
  return increment;
};

export const incrementDislike = async (input: IncrementDislikeInput) => {
  const increment = await IncrementDislikeCount({
    dbName: DB_NAME,
    collectionName: input.type,
    id: input.id,
    dislikeCount: input.dislikeCount,
    userId: input.userId!,
  });
  return increment;
};
