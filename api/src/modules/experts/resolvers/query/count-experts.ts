import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const countExperts = (_, { query }, { prisma }: Context) =>
  prisma
    .expertsConnection({ where: getWhereInput(query) })
    .aggregate()
    .count()
