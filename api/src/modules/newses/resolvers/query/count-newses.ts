import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const countNewses = (_, { query }, { prisma }: Context) =>
  prisma
    .newsesConnection({ where: getWhereInput(query) })
    .aggregate()
    .count()
