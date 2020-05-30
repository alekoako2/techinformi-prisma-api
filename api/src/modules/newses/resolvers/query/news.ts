import { Context } from '@interfaces/apollo/context'

export const news = (_, { id }, { prisma }: Context) => prisma.news({ id })
