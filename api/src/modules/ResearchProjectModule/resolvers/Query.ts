import { Context } from "../../../utils/utils";
import {
  ResearchProjectOrderByInput,
  ResearchProjectWhereInput
} from "../../../generated/prisma-client";

interface opArgs {
  first: String
  skip: String
  where?: ResearchProjectWhereInput
  orderBy?: ResearchProjectOrderByInput
}

export const Query = {

  researchProjects(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = { AND: [] };
      opArgs.where.AND = [];
      if (args.query.title) {
        opArgs.where.AND.push({ translation_some: { title_contains: args.query.title } });
      }
      if (args.query.researchExecutors) {
        opArgs.where.AND.push({ researchExecutors_contains: args.query.researchExecutors });
      }
      if (args.query.keyword) {
        opArgs.where.AND.push({ translation_some: { key_some: { name_contains: args.query.keyword } } });
      }
      if (args.query.organizationName) {
        opArgs.where.AND.push({ organizationName_contains: args.query.organizationName });
      }
      if (args.query.oecd) {
        opArgs.where.AND.push({ oecds_some: { code: args.query.oecd } });
      }
    }

    opArgs.orderBy = "createdAt_DESC";


    return ctx.prisma.researchProjects(opArgs);

  },

  countResearchProjects(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = { AND: [] };
      opArgs.where.AND = [];
      if (args.query.title) {
        opArgs.where.AND.push({ translation_some: { title_contains: args.query.title } });
      }
      if (args.query.researchExecutors) {
        opArgs.where.AND.push({ researchExecutors_contains: args.query.researchExecutors });
      }
      if (args.query.keyword) {
        opArgs.where.AND.push({ translation_some: { key_some: { name_contains: args.query.keyword } } });
      }
      if (args.query.organizationName) {
        opArgs.where.AND.push({ organizationName_contains: args.query.organizationName });
      }
      if (args.query.oecd) {
        opArgs.where.AND.push({ oecds_some: { code: args.query.oecd } });
      }
    }

    opArgs.orderBy = "createdAt_DESC";

    return ctx.prisma.researchProjectsConnection(opArgs).aggregate().count();
  },

  researchProject(parent, { id }, ctx: Context) {
    return ctx.prisma.researchProject({ id });
  }

};
