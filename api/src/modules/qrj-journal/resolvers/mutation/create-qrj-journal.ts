import { Context } from '@interfaces/apollo/context'
import {
  LanguageCreateOneInput,
  QrjJournalCreateInput,
  QrjJournalTranslationCreateInput,
  QrjJournalTranslationCreateManyInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../utils'

export async function createQrjJournal(parent, args, ctx: Context) {
  const input = args.input
  let schema: QrjJournalCreateInput = <QrjJournalCreateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ctx)

  schema.translation = <QrjJournalTranslationCreateManyInput>{}
  schema.translation.create = <QrjJournalTranslationCreateInput[]>[]

  for (let i = 0; i < input.translation.length; i++) {
    schema.translation.create[i] = <QrjJournalTranslationCreateInput>{}
    schema.translation.create[i].language = <LanguageCreateOneInput>{}
    if (input.translation[i].language) {
      schema.translation.create[i].language = {
        connect: { code: input.translation[i].language },
      }
    }
    if (input.translation[i].name) {
      schema.translation.create[i].name = input.translation[i].name
    }
    if (input.translation[i].address) {
      schema.translation.create[i].address = input.translation[i].address
    }
  }
  return ctx.prisma.createQrjJournal({
    ...schema,
  })
}
