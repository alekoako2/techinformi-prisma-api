import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const qrjPublications = async (
  _,
  { query, first, skip, orderBy },
  { prisma }: Context
) =>
  prisma.qrjPublications({
    first,
    skip,
    orderBy,
    where: getWhereInput(query),
  })
