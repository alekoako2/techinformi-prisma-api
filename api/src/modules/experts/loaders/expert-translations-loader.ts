import DataLoader from 'dataloader'
import { ExpertTranslation } from '@prisma-client'
import { DataLoaderLanguageCode } from '@interfaces/data-loader/data-loader-language-code'

type ExpertTranslationsBatch = (
  args: DataLoaderLanguageCode[]
) => Promise<ExpertTranslation[][]>

const expertsTranslationsBatch: ExpertTranslationsBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { languageCode, prisma } = args[0]

  let where = ''
  if (languageCode) where = `(where: { language: { code: ${languageCode} } })`

  const expertsTranslations = await prisma
    .experts({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(
      `{ id translation ${where} { fullName qualification academicDegree specialization workingPlace position } }`
    )

  return ids.map(
    id =>
      expertsTranslations.find(
        expertsTranslation => expertsTranslation.id === id
      ).translation
  )
}

export const expertTranslationsLoader = () =>
  new DataLoader<DataLoaderLanguageCode, ExpertTranslation[]>(
    expertsTranslationsBatch
  )
