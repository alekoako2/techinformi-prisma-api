import { Context } from '@interfaces/apollo/context'
import {
  QrjJournalTranslationUpdateDataInput,
  QrjJournalTranslationUpdateManyInput,
  QrjJournalTranslationUpdateWithWhereUniqueNestedInput,
  QrjJournalTranslationWhereUniqueInput,
  QrjJournalUpdateInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../utils'

export const updateQrjJournal = async (parent, args, ctx: Context) => {
  const { input, id } = args

  const qrjJournal = await ctx.prisma.qrjJournal({ id })

  if (!qrjJournal) {
    throw new Error('QrjJournal not found!')
  }
  let schema: QrjJournalUpdateInput = <QrjJournalUpdateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ctx)

  schema.translation = <QrjJournalTranslationUpdateManyInput>{}
  schema.translation.update = <
    QrjJournalTranslationUpdateWithWhereUniqueNestedInput[]
  >[]

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.update[i] = <
        QrjJournalTranslationUpdateWithWhereUniqueNestedInput
      >{}
      schema.translation.update[i].where = <
        QrjJournalTranslationWhereUniqueInput
      >{}
      schema.translation.update[i].data = <
        QrjJournalTranslationUpdateDataInput
      >{}

      let translation = await ctx.prisma.qrjJournal({ id }).translation({
        where: { language: { code: input.translation[i].language } },
      })

      if (input.translation[i].name) {
        schema.translation.update[i].data.name = input.translation[i].name
      }
      if (input.translation[i].address) {
        schema.translation.update[i].data.address = input.translation[i].address
      }

      schema.translation.update[i].where.id = translation[0].id
    }
  }

  return ctx.prisma.updateQrjJournal({
    data: {
      ...schema,
    },
    where: { id },
  })
}
