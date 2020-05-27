import { Context } from '@interfaces/apollo/context'

export const oecd = (_, { id }, { prisma }: Context) => prisma.oecd({ id })
