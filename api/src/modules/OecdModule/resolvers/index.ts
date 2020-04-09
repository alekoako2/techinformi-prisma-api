import {Query} from "./Query";
import {Oecd} from "./Oecd";
import {OecdTranslation} from "./OecdTranslation";
import {oecd} from "./mutations/oecd";
import {User} from "./User";

export const resolvers = {
    Query,
    Oecd,
    OecdTranslation,
    Mutation: {
        ...oecd
    },
    User
};
