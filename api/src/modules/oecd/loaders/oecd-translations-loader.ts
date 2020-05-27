import DataLoader from 'dataloader'
import { OecdTranslation } from '@prisma-client'
import { DataLoaderLanguageCode } from '@interfaces/data-loader/data-loader-language-code'

type OecdTranslationsBatch = (
  args: DataLoaderLanguageCode[]
) => Promise<OecdTranslation[][]>

const oecdTranslationsBatch: OecdTranslationsBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { languageCode, prisma } = args[0]

  let where = ''
  if (languageCode) where = `(where: { language: { code: ${languageCode} } })`

  const oecdTranslations = await prisma
    .oecds({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(`{ id translation ${where} { name } }`)

  return ids.map(
    id =>
      oecdTranslations.find(oecdTranslation => oecdTranslation.id === id)
        .translation
  )
}

export const oecdTranslationsLoader = () =>
  new DataLoader<DataLoaderLanguageCode, OecdTranslation[]>(
    oecdTranslationsBatch
  )
