import DataLoader from 'dataloader'
import { QrjJournalTranslation } from '@prisma-client'
import { DataLoaderLanguageCode } from '@interfaces/data-loader/data-loader-language-code'

type QrjJournalTranslationsBatch = (
  args: DataLoaderLanguageCode[]
) => Promise<QrjJournalTranslation[][]>

const qrjJournalTranslationsBatch: QrjJournalTranslationsBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { languageCode, prisma } = args[0]

  let where = ''
  if (languageCode) where = `(where: { language: { code: ${languageCode} } })`

  const qrjJournalTranslations = await prisma
    .qrjJournals({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(`{ id translation ${where} { name address } }`)

  return ids.map(
    id =>
      qrjJournalTranslations.find(
        qrjJournalTranslation => qrjJournalTranslation.id === id
      ).translation
  )
}

export const qrjJournalTranslationsLoader = () =>
  new DataLoader<DataLoaderLanguageCode, QrjJournalTranslation[]>(
    qrjJournalTranslationsBatch
  )
