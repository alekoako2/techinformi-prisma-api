import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../../loaders'

export const qrjJournal = ({ id }, __, { prisma }: Context) =>
  Loaders.qrjPublicationQrjJournalsLoader.load({
    id,
    prisma,
  })
