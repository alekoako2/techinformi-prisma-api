import DataLoader from 'dataloader'
import { NewsTranslation } from '@prisma-client'
import { DataLoaderLanguageCode } from '@interfaces/data-loader/data-loader-language-code'

type NewsTranslationsBatch = (
  args: DataLoaderLanguageCode[]
) => Promise<NewsTranslation[][]>

const newsesTranslationsBatch: NewsTranslationsBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { languageCode, prisma } = args[0]

  let where = ''
  if (languageCode) where = `(where: { language: { code: ${languageCode} } })`

  const newsesTranslations = await prisma
    .newses({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(
      `{ id translation ${where} { id title description content } }`
    )

  return ids.map(
    id =>
      newsesTranslations.find(newsesTranslation => newsesTranslation.id === id)
        .translation
  )
}

export const newsTranslationsLoader = () =>
  new DataLoader<DataLoaderLanguageCode, NewsTranslation[]>(
    newsesTranslationsBatch
  )
