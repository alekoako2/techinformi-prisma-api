import { Context } from "../../../utils/utils";
import {
  ExpertOrderByInput,
  ExpertWhereInput
} from "../../../generated/prisma-client";

interface opArgs {
  first: String
  skip: String
  where?: ExpertWhereInput
  orderBy?: ExpertOrderByInput
}

export const Query = {

  employees(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = { AND: [] };
      opArgs.where.AND = [];
      if (args.query.department) {
        opArgs.where.AND.push({ translation_some: { fullName_contains: args.query.fullName } });
      }
    }

    opArgs.orderBy = "createdAt_DESC";

    return ctx.prisma.employees(opArgs);

  },

};
