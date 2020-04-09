import { Context } from "../../../utils/utils";
import { NewsOrderByInput, NewsWhereInput } from "../../../generated/prisma-client";

interface opArgs {
  first: String
  skip: String
  where?: NewsWhereInput
  orderBy?: NewsOrderByInput
}


export const Query = {
  newses(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            id_contains: args.query
          }
        ]
      };
    }

    opArgs.orderBy = "createdAt_DESC";

    return ctx.prisma.newses(opArgs);

  },
  countNewses(parent, args, ctx: Context) {
    return ctx.prisma.newsesConnection().aggregate().count();
  },
  news(parent, { id }, ctx: Context) {
    return ctx.prisma.news({ id });
  }

};
