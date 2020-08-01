import DataLoader from 'dataloader'
import { DepositedTranslation } from '@prisma-client'
import { DataLoaderLanguageCode } from '@interfaces/data-loader/data-loader-language-code'
import { deposited } from '../resolvers/query/deposited'

type DepositedTranslationsBatch = (
  args: DataLoaderLanguageCode[]
) => Promise<DepositedTranslation[][]>

const depositedsTranslationsBatch: DepositedTranslationsBatch = async args => {
  const ids = args.map(arg => arg.id)

  const { languageCode, prisma } = args[0]

  let where = ''
  if (languageCode) where = `(where: { language: { code: ${languageCode} } })`

  const depositedsTranslations = await prisma
    .depositeds({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(
      `{ id translation ${where} { id title author institute resume } }`
    )

  return ids.map(
    id =>
      depositedsTranslations.find(
        depositedsTranslation => depositedsTranslation.id === id
      ).translation
  )
}

export const depositedTranslationsLoader = () =>
  new DataLoader<DataLoaderLanguageCode, DepositedTranslation[]>(
    depositedsTranslationsBatch
  )
