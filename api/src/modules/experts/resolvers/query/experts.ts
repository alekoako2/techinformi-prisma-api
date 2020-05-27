import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const experts = async (
  _,
  { query, first, skip, orderBy },
  { prisma }: Context
) =>
  prisma.experts({
    first,
    skip,
    orderBy,
    where: getWhereInput(query),
  })
