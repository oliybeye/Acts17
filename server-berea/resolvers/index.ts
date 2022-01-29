import { getNews, getSources } from "../controllers/newsFeed.controllers";
import { Resolvers } from "../models/graphql";

const Resolvers = {
    Query: {
        news: () => getNews(),
        newsSources: () => getSources()
    }
}

export default Resolvers;