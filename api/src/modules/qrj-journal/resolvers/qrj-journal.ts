import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../loaders'

export const QrjJournal = {
  translation: ({ id }, { language }, { prisma }: Context) =>
    Loaders.qrjJournalTranslationsLoader.load({
      id,
      languageCode: language,
      prisma,
    }),
}
