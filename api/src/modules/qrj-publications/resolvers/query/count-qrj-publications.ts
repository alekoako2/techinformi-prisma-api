import { Context } from '@interfaces/apollo/context'
import { getWhereInput } from '../../utils'

export const countQrjPublications = (_, { query }, { prisma }: Context) =>
  prisma
    .qrjPublicationsConnection({ where: getWhereInput(query) })
    .aggregate()
    .count()
