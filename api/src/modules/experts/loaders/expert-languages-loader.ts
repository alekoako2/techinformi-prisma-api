import DataLoader from 'dataloader'
import { Language } from '@prisma-client'
import { DataLoaderBasicArgs } from '@interfaces/data-loader/data-loader-basic-args'

type ExpertLanguagesBatch = (args: DataLoaderBasicArgs[]) => Promise<Language[]>

const expertLanguageBatch: ExpertLanguagesBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { prisma } = args[0]

  const expertLanguages = await prisma
    .experts({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(`{ id languages{ id code name } }`)

  return ids.map(
    id =>
      expertLanguages.find(expertLanguage => expertLanguage.id === id).languages
  )
}

export const expertLanguagesLoader = () =>
  new DataLoader<DataLoaderBasicArgs, Language>(expertLanguageBatch)
