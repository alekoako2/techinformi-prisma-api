import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../../loaders'

export const translation = ({ id }, { language }, { prisma }: Context) =>
  Loaders.expertTranslationsLoader.load({
    id,
    languageCode: language,
    prisma,
  })
