import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const qrjJournals = (
  _,
  { query, first, skip, orderBy },
  { prisma }: Context
) =>
  prisma.qrjJournals({
    first,
    skip,
    orderBy,
    where: getWhereInput(query),
  })
