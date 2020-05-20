import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../loaders'

export const Oecd = {
  translation: ({ id }, { language }, { prisma }: Context) =>
    Loaders.oecdTranslationsLoader.load({
      id,
      languageCode: language,
      prisma,
    }),
}
