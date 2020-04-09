import { Query } from "./Query";
import { User } from "./User";
import { TechnologyTransferAndInnovationOrganization } from "./TechnologyTransferAndInnovationOrganization";
import { technologyTransferAndInnovationOrganization } from "./mutations/technologyTransferAndInnovationOrganization";

export const resolvers = {
  Query,
  TechnologyTransferAndInnovationOrganization,
  Mutation: {
    ...technologyTransferAndInnovationOrganization
  },
  User
};
