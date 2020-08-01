import DataLoader from 'dataloader'
import { Oecd } from '@prisma-client'
import { DataLoaderBasicArgs } from '@interfaces/data-loader/data-loader-basic-args'

type DepositedsOecdBatch = (args: DataLoaderBasicArgs[]) => Promise<Oecd[]>

const depositedsOecdBatch: DepositedsOecdBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { prisma } = args[0]

  const depositedsOecds = await prisma
    .depositeds({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(`{ id oecd{ id code } }`)

  return ids.map(
    id => depositedsOecds.find(depositedsOecd => depositedsOecd.id === id).oecd
  )
}

export const depositedOecdsLoader = () =>
  new DataLoader<DataLoaderBasicArgs, Oecd>(depositedsOecdBatch)
