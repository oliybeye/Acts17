import { News, Source } from "../models/graphql";
import QueryDB from "../utils/dbAccesor";

export const getNews = async () => {
    const news: News = await QueryDB({dbName: 'myProject', collectionName: 'news', filter: {}}) as News;
    return news;
}

export const getSources = async () => {
    const news: Source = await QueryDB({dbName: 'myProject', collectionName: 'sources', filter: {}}) as Source;
    return news;
}
