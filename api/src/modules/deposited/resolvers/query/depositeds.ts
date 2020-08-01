import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const depositeds = async (
  _,
  { query, first, skip, orderBy },
  { prisma }: Context
) =>
  prisma.depositeds({
    first,
    skip,
    orderBy,
    where: getWhereInput(query),
  })
