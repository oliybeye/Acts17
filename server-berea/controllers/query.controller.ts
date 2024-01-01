import {
  CommentsQueryInput,
  News,
  NewsQueryInput,
  Platform,
  Comment as ApiComment,
} from "../models/graphql";
import {
  News as DbNews,
  Platforms as DbPlatforms,
  Comment as DbComment,
} from "../models/db";
import {
  DB_COMMENT_COLLECTION,
  DB_METADATA_COLLECTION,
  DB_NAME,
  QueryDB,
} from "../utils/dbAccesor";
import { randomizeNewsOrder } from "../utils/func";
import {
  getCacheElection,
  getCacheNews,
  getCacheStateCounties,
} from "../caching";

export const getNews = async (input: NewsQueryInput) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const news = (await getCacheNews())
    .filter((n) => {
      const time = new Date(n.time);
      if (input.today) {
        return time > yesterday;
      }
      return true;
    })
    .map((dbNew) => {
      return {
        id: dbNew._id.toString(),
        date: dbNew?.date,
        title: dbNew.title,
        author: dbNew.author,
        url: dbNew.url,
        platform: {
          name: dbNew.platform?.name,
          site: dbNew.platform?.site,
          owner: dbNew.platform?.owner,
          clickBaitingScore: dbNew.platform?.clickBaitingScore,
        },
        imgUrl: dbNew.imageurl,
        like: dbNew.like,
        dislike: dbNew.dislike,
      } as News;
    });

  return randomizeNewsOrder(news);
};

export const getSources = async () => {
  const dbPlatforms = (await QueryDB({
    dbName: DB_NAME,
    collectionName: DB_METADATA_COLLECTION,
    filter: {},
  })) as DbPlatforms[];
  const sources = dbPlatforms.map((dbPlatform) => {
    return {
      clickBaitingScore: dbPlatform.clickBaitingScore,
      name: dbPlatform.name,
      owner: dbPlatform.owner,
      site: dbPlatform.site,
    } as Platform;
  });
  return sources;
};

export const getComments = async (input: CommentsQueryInput) => {
  const comments = (await QueryDB({
    dbName: DB_NAME,
    collectionName: DB_COMMENT_COLLECTION,
    filter: {
      parentCommentId: input.id,
    },
  })) as DbComment[];

  return comments.map((comment) => {
    return {
      comment: comment.comment,
      userId: comment.userId,
      timeStamp: comment.timestamp,
      id: comment._id.toString(),
    } as ApiComment;
  });
};

export const getCounty = async (state: string, county?: string) => {
  const counties = await getCacheElection(state);
  const result = county ? counties.find((c) => c.county === county) : [];
  return result;
};

export const getStateCounties = async () => {
  return await getCacheStateCounties();
};
