import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../../loaders'

export const translation = ({ id }, { language }, { prisma }: Context) =>
  Loaders.qrjPublicationTranslationsLoader.load({
    id,
    languageCode: language,
    prisma,
  })
