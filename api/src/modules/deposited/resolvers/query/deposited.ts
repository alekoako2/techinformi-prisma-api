import { Context } from '@interfaces/apollo/context'

export const deposited = (_, { id }, { prisma }: Context) =>
  prisma.deposited({ id })
