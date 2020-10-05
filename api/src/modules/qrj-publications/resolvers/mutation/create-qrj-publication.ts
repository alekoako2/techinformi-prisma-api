import { Context } from '@interfaces/apollo/context'
import {
  QrjPublicationCreateInput,
  QrjPublicationTranslationCreateInput,
  QrjPublicationTranslationCreateManyInput,
} from '@prisma-client'
import { getUser } from '../../../../utils'

export const createQrjPublication = async (
  _,
  {
    input: {
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
  let schema: QrjPublicationCreateInput = {} as QrjPublicationCreateInput

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

  if (qrjJournal) {
    schema.journal = { connect: { code: qrjJournal } }
  }
  if (oecd) {
    schema.oecd = { connect: { code: oecd } }
  }

  schema.translation = {} as QrjPublicationTranslationCreateManyInput
  schema.translation.create = [] as QrjPublicationTranslationCreateInput[]

  if (translation)
    for (let i = 0; i < translation.length; i++) {
      const {
        title,
        publicationAuthor,
        publicationLang,
        abstract,
        language,
      } = translation[i]

      schema.translation.create[i] = {} as QrjPublicationTranslationCreateInput

      schema.translation.create[i] = {
        title,
        publicationAuthor,
        publicationLang,
        abstract,
        language: {
          connect: { code: language },
        },
      }
    }

  return ___.prisma.createQrjPublication({
    ...schema,
  })
}
