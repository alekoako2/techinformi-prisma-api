import {auth} from "./mutations/auth";
import {Query} from "./Query";
import {User} from "./User";
import {UserTranslation} from "./UserTranslation";

export const resolvers = {
    Query,
    User,
    UserTranslation,
    Mutation: {
        ...auth
    }
};
