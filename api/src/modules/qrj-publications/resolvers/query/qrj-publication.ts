import { Context } from '@interfaces/apollo/context'

export const qrjPublication = (_, { id }, { prisma }: Context) =>
  prisma.qrjPublication({ id })
