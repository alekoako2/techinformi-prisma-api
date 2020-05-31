import { Context } from '@interfaces/apollo/context'
import {
  QrjPublicationTranslationUpdateDataInput,
  QrjPublicationTranslationUpdateManyInput,
  QrjPublicationTranslationUpdateWithWhereUniqueNestedInput,
  QrjPublicationTranslationWhereUniqueInput,
  QrjPublicationUpdateInput,
} from '@prisma-client'
import { getUser } from '../../../../utils'
import { qrj } from '../../../QrjModule/resolvers/mutations/qrj'

export const updateQrjPublication = async (
  _,
  {
    input: {
      id,
      index,
      year,
      number,
      pages,
      inputDate,
      doiUrl,
      qrjJournal,
      oecd,
      translation,
    },
  },
  ___: Context
) => {
  const qrjPublication = await ___.prisma.qrjPublication({ id })

  if (!qrjPublication) {
    throw new Error('QrjPublication not found!')
  }

  let schema: QrjPublicationUpdateInput = {} as QrjPublicationUpdateInput

  const user = await getUser(___)

  if (!user) {
    throw new Error('User not authenticated')
  }

  schema = {
    index,
    year,
    number,
    pages,
    inputDate,
    doiUrl,
    edited: true,
    author: {
      connect: {
        email: user.email,
      },
    },
  }
  if (oecd) schema.oecd = { connect: { code: oecd } }

  if (qrjJournal) schema.journal = { connect: { code: qrjJournal } }

  schema.translation = {} as QrjPublicationTranslationUpdateManyInput
  schema.translation.update = [] as QrjPublicationTranslationUpdateWithWhereUniqueNestedInput[]

  for (let i = 0; i < translation.length; i++) {
    const {
      title,
      publicationAuthor,
      publicationLang,
      abstract,
      language,
      id,
    } = translation[i]

    schema.translation.update[
      i
    ] = {} as QrjPublicationTranslationUpdateWithWhereUniqueNestedInput

    schema.translation.update[
      i
    ].where = {} as QrjPublicationTranslationWhereUniqueInput

    schema.translation.update[
      i
    ].data = {} as QrjPublicationTranslationUpdateDataInput

    schema.translation.update[i].data = {
      title,
      publicationAuthor,
      publicationLang,
      abstract,
      language: {
        connect: { code: language },
      },
    }

    schema.translation.update[i].where = { id }
  }

  return ___.prisma.updateQrjPublication({
    data: {
      ...schema,
    },
    where: { id },
  })
}
