import DataLoader from 'dataloader'
import { QrjJournal } from '@prisma-client'
import { DataLoaderBasicArgs } from '@interfaces/data-loader/data-loader-basic-args'

type QrjPublicationsQrjJournalBatch = (
  args: DataLoaderBasicArgs[]
) => Promise<QrjJournal[]>

const qrjPublicationsQrjJournalBatch: QrjPublicationsQrjJournalBatch = async args => {
  const ids = args.map(arg => arg.id)
  const { prisma } = args[0]

  const qrjPublicationsQrjJournals = await prisma
    .qrjPublications({ where: { OR: [...ids.map(id => ({ id }))] } })
    .$fragment<any[]>(`{ id journal{ id code } }`)

  return ids.map(
    id =>
      qrjPublicationsQrjJournals.find(
        qrjPublicationsQrjJournal => qrjPublicationsQrjJournal.id === id
      ).journal
  )
}

export const qrjPublicationQrjJournalsLoader = () =>
  new DataLoader<DataLoaderBasicArgs, QrjJournal>(
    qrjPublicationsQrjJournalBatch
  )
