import DataLoader from 'dataloader'
import { QrjPublicationTranslation } from '@prisma-client'
import { DataLoaderLanguageCode } from '@interfaces/data-loader/data-loader-language-code'

type QrjPublicationTranslationsBatch = (
  args: DataLoaderLanguageCode[]
) => Promise<QrjPublicationTranslation[][]>

const qrjPublicationsTranslationsBatch: QrjPublicationTranslationsBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { languageCode, prisma } = args[0]

  let where = ''
  if (languageCode) where = `(where: { language: { code: ${languageCode} } })`

  const qrjPublicationsTranslations = await prisma
    .qrjPublications({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(
      `{ id translation ${where} { title abstract publicationAuthor publicationLang } }`
    )

  return ids.map(
    id =>
      qrjPublicationsTranslations.find(
        qrjPublicationsTranslation => qrjPublicationsTranslation.id === id
      ).translation
  )
}

export const qrjPublicationTranslationsLoader = () =>
  new DataLoader<DataLoaderLanguageCode, QrjPublicationTranslation[]>(
    qrjPublicationsTranslationsBatch
  )
