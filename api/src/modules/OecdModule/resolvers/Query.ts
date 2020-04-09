import { Context } from "../../../utils/utils";
import {
  OecdOrderByInput,
  OecdWhereInput
} from "../../../generated/prisma-client";

interface opArgs {
  first: String
  skip: String
  where?: OecdWhereInput
  orderBy?: OecdOrderByInput
}

export const Query = {

  oecds(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            code_contains: args.query
          }
        ]
      };
    }

    opArgs.orderBy = "code_ASC";

    return ctx.prisma.oecds(opArgs);

  },

  countOecds(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            code_contains: args.query
          }
        ]
      };
    }
    return ctx.prisma.oecdsConnection().aggregate().count();
  },

  oecd(parent, { id }, ctx: Context) {
    return ctx.prisma.oecd({ id });
  }

};
