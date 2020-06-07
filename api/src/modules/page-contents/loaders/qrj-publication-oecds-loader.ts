import DataLoader from 'dataloader'
import { Oecd } from '@prisma-client'
import { DataLoaderBasicArgs } from '@interfaces/data-loader/data-loader-basic-args'

type QrjPublicationsOecdBatch = (args: DataLoaderBasicArgs[]) => Promise<Oecd[]>

const qrjPublicationsOecdBatch: QrjPublicationsOecdBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { prisma } = args[0]

  const qrjPublicationsOecds = await prisma
    .qrjPublications({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(`{ id oecd{ id code } }`)

  return ids.map(
    id =>
      qrjPublicationsOecds.find(
        qrjPublicationsOecd => qrjPublicationsOecd.id === id
      ).oecd
  )
}

export const qrjPublicationOecdsLoader = () =>
  new DataLoader<DataLoaderBasicArgs, Oecd>(qrjPublicationsOecdBatch)
