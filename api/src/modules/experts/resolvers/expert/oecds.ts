import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../../loaders'

export const oecds = ({ id }, __, { prisma }: Context) =>
  Loaders.expertOecdsLoader.load({
    id,
    prisma,
  })
