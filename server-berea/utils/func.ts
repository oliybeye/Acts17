import { News } from "../models/graphql";

export const randomizeNewsOrder = (news: News[]) => {
    for (let i = news.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [news[i], news[j]] = [news[j], news[i]];
    }
    return news;
}