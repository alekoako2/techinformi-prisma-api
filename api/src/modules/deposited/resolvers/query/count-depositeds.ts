import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const countDepositeds = (_, { query }, { prisma }: Context) =>
  prisma
    .depositedsConnection({ where: getWhereInput(query) })
    .aggregate()
    .count()
