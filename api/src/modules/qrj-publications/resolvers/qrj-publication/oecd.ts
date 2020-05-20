import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../../loaders'

export const oecd = ({ id }, __, { prisma }: Context) =>
  Loaders.qrjPublicationOecdsLoader.load({
    id,
    prisma,
  })
