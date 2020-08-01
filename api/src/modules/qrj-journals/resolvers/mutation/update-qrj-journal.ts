import { Context } from '@interfaces/apollo/context'
import {
  QrjJournalTranslationUpdateDataInput,
  QrjJournalTranslationUpdateManyInput,
  QrjJournalTranslationUpdateWithWhereUniqueNestedInput,
  QrjJournalTranslationWhereUniqueInput,
  QrjJournalUpdateInput,
} from '@prisma-client'

import { getUser } from '../../../../utils'

export const updateQrjJournal = async (
  _,
  { input: { id, code, translation } },
  ___: Context
) => {
  const qrjJournal = await ___.prisma.qrjJournal({ id })

  if (!qrjJournal) {
    throw new Error('Qrj Journal not found!')
  }

  let schema: QrjJournalUpdateInput = {} as QrjJournalUpdateInput

  const user = await getUser(___)

  if (!user) {
    throw new Error('User not authenticated')
  }

  schema = {
    code,
  }

  schema.translation = {} as QrjJournalTranslationUpdateManyInput
  schema.translation.update = [] as QrjJournalTranslationUpdateWithWhereUniqueNestedInput[]

  for (let i = 0; i < translation.length; i++) {
    const { id, name, address, language } = translation[i]

    schema.translation.update[
      i
    ] = {} as QrjJournalTranslationUpdateWithWhereUniqueNestedInput

    schema.translation.update[
      i
    ].where = {} as QrjJournalTranslationWhereUniqueInput

    schema.translation.update[
      i
    ].data = {} as QrjJournalTranslationUpdateDataInput

    schema.translation.update[i].data = {
      name,
      address,
      language: {
        connect: { code: language },
      },
    }

    schema.translation.update[i].where = { id }
  }

  return ___.prisma.updateQrjJournal({
    data: {
      ...schema,
    },
    where: { id },
  })
}
