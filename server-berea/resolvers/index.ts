import {
  createComment,
  incrementDislike,
  incrementLike,
} from "../controllers/mutation.controller";
import {
  getComments,
  getNews,
  getSources,
  getCounty,
  getStateCounties,
} from "../controllers/query.controller";
import {
  MutationCommentArgs,
  MutationIncrementDislikeArgs,
  MutationIncrementLikeArgs,
  QueryCommentsArgs,
  QueryCountyArgs,
  QueryNewsArgs,
  Resolvers,
} from "../models/graphql";

const Resolvers = {
  Query: {
    news: async (_: undefined, args: QueryNewsArgs) => getNews(args.input),
    sources: () => getSources(),
    comments: async (_: any, args: QueryCommentsArgs) =>
      getComments(args.input),
    county: async (_: undefined, args: QueryCountyArgs) =>
      getCounty("WA", args.name ?? ""), // hard coded state to WA for now
    stateCounties: async () => getStateCounties(),
  },
  Mutation: {
    comment: async (_: any, args: MutationCommentArgs) =>
      createComment(args.input),
    incrementLike: async (_: any, args: MutationIncrementLikeArgs) =>
      incrementLike(args.input),
    incrementDislike: async (_: any, args: MutationIncrementDislikeArgs) =>
      incrementDislike(args.input),
  },
};

export default Resolvers;
