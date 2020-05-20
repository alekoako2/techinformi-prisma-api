import DataLoader from 'dataloader'
import { Oecd } from '@prisma-client'
import { DataLoaderBasicArgs } from '@interfaces/data-loader/data-loader-basic-args'

type ExpertsOecdBatch = (args: DataLoaderBasicArgs[]) => Promise<Oecd[][]>

const expertsOecdBatch: ExpertsOecdBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { prisma } = args[0]

  const expertsOecds = await prisma
    .experts({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(`{ id oecds{ id code } }`)

  return ids.map(
    id => expertsOecds.find(expertsOecd => expertsOecd.id === id).oecds
  )
}

export const expertOecdsLoader = () =>
  new DataLoader<DataLoaderBasicArgs, Oecd[]>(expertsOecdBatch)
