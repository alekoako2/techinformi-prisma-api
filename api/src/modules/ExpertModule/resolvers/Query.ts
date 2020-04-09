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

  experts(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = { AND: [] };
      opArgs.where.AND = [];
      if (args.query.fullName) {
        opArgs.where.AND.push({ translation_some: { fullName_contains: args.query.fullName } });
      }
      if (args.query.oecd) {
        opArgs.where.AND.push({ oecds_some: { code: args.query.oecd } });
      }
      if (args.query.specialization) {
        opArgs.where.AND.push({ translation_some: { specialization_contains: args.query.specialization } });
      }
    }

    opArgs.orderBy = "createdAt_DESC";

    return ctx.prisma.experts(opArgs);

  },

  countExperts(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = { AND: [] };
      opArgs.where.AND = [];
      if (args.query.fullName) {
        opArgs.where.AND.push({ translation_some: { fullName_contains: args.query.fullName } });
      }
      if (args.query.oecd) {
        opArgs.where.AND.push({ oecds_some: { code: args.query.oecd } });
      }
      if (args.query.specialization) {
        opArgs.where.AND.push({ translation_some: { specialization_contains: args.query.specialization } });
      }
    }

    opArgs.orderBy = "createdAt_DESC";

    return ctx.prisma.expertsConnection(opArgs).aggregate().count();
  },

  expert(parent, { id }, ctx: Context) {
    return ctx.prisma.expert({ id });
  }

};
