import { Context } from '@interfaces/apollo/context'

export const countQrjJournals = (_, { query }, { prisma }: Context) =>
  prisma
    .qrjJournalsConnection()
    .aggregate()
    .count()
