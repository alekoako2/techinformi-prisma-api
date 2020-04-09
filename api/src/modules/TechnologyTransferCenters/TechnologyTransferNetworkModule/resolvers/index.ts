import { Query } from "./Query";
import { User } from "./User";
import { TechnologyTransferNetwork } from "./TechnologyTransferNetwork";
import { technologyTransferNetwork } from "./mutations/technologyTransferNetwork";

export const resolvers = {
  Query,
  TechnologyTransferNetwork,
  Mutation: {
    ...technologyTransferNetwork
  },
  User
};
