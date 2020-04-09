import {Query} from "./Query";
import {NewsTranslation} from "./NewsTranslation";
import {News} from "./News";
import {User} from "./User";
import {news} from "./mutations/news";

export const resolvers = {
    Query,
    News,
    NewsTranslation,
    Mutation: {
        ...news
    },
    User
};
