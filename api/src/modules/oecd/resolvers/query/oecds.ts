import { getWhereInput } from '../../utils'
import { Context } from '@interfaces/apollo/context'

export const oecds = async (
  _,
  { query, first, skip, orderBy },
  { prisma }: Context
) =>
  prisma.oecds({
    first,
    skip,
    orderBy,
    where: getWhereInput(query),
  })
