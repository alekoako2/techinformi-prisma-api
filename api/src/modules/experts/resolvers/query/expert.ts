import { Context } from '@interfaces/apollo/context'

export const expert = (_, { id }, { prisma }: Context) => prisma.expert({ id })
