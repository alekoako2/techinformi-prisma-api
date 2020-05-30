import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const newses = async (
  _,
  { query, first, skip, orderBy },
  { prisma }: Context
) =>
  prisma.newses({
    first,
    skip,
    orderBy,
    where: getWhereInput(query),
  })
