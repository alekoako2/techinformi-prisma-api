import { Query } from "./Query";
import { QrjPublication } from "./QrjPublication";
import { QrjPublicationTranslation } from "./QrjPublicationTranslation";
import { qrjPublications } from "./mutations/qrj-publications";
import { User } from "./User";


export const resolvers = {
  Query,
  QrjPublication,
  QrjPublicationTranslation,
  Mutation: {
    ...qrjPublications
  },
  User
};
