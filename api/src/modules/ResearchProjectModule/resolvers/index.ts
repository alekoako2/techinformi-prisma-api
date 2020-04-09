import { Query } from "./Query";
import { User } from "./User";
import { researchProject } from "./mutations/researchProject";
import { ResearchProjectTranslation } from "./ResearchProjectTranslation";
import { ResearchProject } from "./ResearchProject";

export const resolvers = {
  Query,
  ResearchProject,
  ResearchProjectTranslation,
  Mutation: {
    ...researchProject
  },
  User
};
