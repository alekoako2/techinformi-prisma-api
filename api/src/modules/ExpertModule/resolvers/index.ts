import { Query } from "./Query";
import { User } from "./User";
import { expert } from "./mutations/expert";
import { ExpertTranslation } from "./ExpertTranslation";
import { Expert } from "./Expert";

export const resolvers = {
  Query,
  Expert,
  ExpertTranslation,
  Mutation: {
    ...expert
  },
  User
};
