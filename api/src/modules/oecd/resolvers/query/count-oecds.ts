import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const countOecds = (_, { query }, { prisma }: Context) =>
  prisma
    .oecdsConnection({ where: getWhereInput(query) })
    .aggregate()
    .count()
