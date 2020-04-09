import { Context } from "../../../utils/utils";
import {
  QrjJournalOrderByInput,
  QrjJournalWhereInput
} from "../../../generated/prisma-client";

interface opArgs {
  first: String
  skip: String
  where?: QrjJournalWhereInput
  orderBy?: QrjJournalOrderByInput
}

export const Query = {

  qrjJournals(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            translation_some: { name_contains: args.query }
          }
        ]
      };
    }

    opArgs.orderBy = "createdAt_DESC";

    return ctx.prisma.qrjJournals(opArgs);
  },

  countQrjJournals(parent, args, ctx: Context) {
    return ctx.prisma.qrjJournalsConnection().aggregate().count();
  },

  qrjJournal(parent, { id }, ctx: Context) {
    return ctx.prisma.qrjJournal({ id });
  }

};
