import { Query } from "./Query";
import { Qrj } from "./Qrj";
import { QrjTranslation } from "./QrjTranslation";
import { qrj } from "./mutations/qrj";
import { User } from "./User";
import { Journal } from "./Journal";

export const resolvers = {
  Query,
  Qrj,
  Journal,
  QrjTranslation,
  Mutation: {
    ...qrj
  },
  User
};
