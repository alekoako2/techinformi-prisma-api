import { Context } from "../../../utils/utils";
import { QrjPublicationOrderByInput, QrjPublicationWhereInput } from "../../../generated/prisma-client";

interface opArgs {
  first: String
  skip: String
  where?: QrjPublicationWhereInput
  orderBy?: QrjPublicationOrderByInput
}

export const Query = {
  qrjPublications(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = { AND: [] };
      opArgs.where.AND = [];
      if (args.query.index) {
        opArgs.where.AND.push({ index_contains: args.query.index });
      }
      if (args.query.title) {
        opArgs.where.AND.push({ translation_some: { title_contains: args.query.title } });
      }
      if (args.query.author) {
        opArgs.where.AND.push({ translation_some: { publicationAuthor_contains: args.query.author } });
      }
      if (args.query.qrjJournal) {
        opArgs.where.AND.push({ journal: { code: args.query.qrjJournal } });
      }
      if (args.query.oecd) {
        opArgs.where.AND.push({ oecd: { code: args.query.oecd } });
      }
      if (args.query.yearStart) {
        opArgs.where.AND.push({ inputDate_gte: args.query.yearStart });
      }
      if (args.query.yearEnd) {
        opArgs.where.AND.push({ inputDate_lte: args.query.yearEnd });
      }
    }

    opArgs.orderBy = "updatedAt_DESC";

    return ctx.prisma.qrjPublications(opArgs);
  },

  countQrjPublications(parent, args, ctx: Context) {
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
      if (args.query.author) {
        opArgs.where.AND.push({ translation_some: { publicationAuthor_contains: args.query.author } });
      }
      if (args.query.qrjJournal) {
        opArgs.where.AND.push({ journal: { code: args.query.qrjJournal } });
      }
      if (args.query.oecd) {
        opArgs.where.AND.push({ oecd: { code: args.query.oecd } });
      }
      if (args.query.yearStart) {
        opArgs.where.AND.push({ inputDate_gte: args.query.yearStart });
      }
      if (args.query.yearEnd) {
        opArgs.where.AND.push({ inputDate_lte: args.query.yearEnd });
      }
    }

    opArgs.orderBy = "createdAt_ASC";

    return ctx.prisma.qrjPublicationsConnection(opArgs).aggregate().count();
  },

  qrjPublication(parent, { id }, ctx: Context) {
    return ctx.prisma.qrjPublication({ id });
  }

};
