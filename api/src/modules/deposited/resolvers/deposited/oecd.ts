import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../../loaders'

export const oecd = ({ id }, __, { prisma }: Context) =>
  Loaders.depositedOecdsLoader.load({
    id,
    prisma,
  })
