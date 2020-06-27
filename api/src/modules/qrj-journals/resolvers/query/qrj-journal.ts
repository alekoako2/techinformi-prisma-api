import { Context } from '@interfaces/apollo/context'

export const qrjJournal = (_, { id }, { prisma }: Context) =>
  prisma.qrjJournal({ id })
