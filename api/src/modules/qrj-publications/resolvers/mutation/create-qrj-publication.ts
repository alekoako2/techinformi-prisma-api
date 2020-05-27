import { Context } from '@interfaces/apollo/context'
import {
  OecdTranslationCreateInput,
  OecdTranslationCreateManyInput,
  QrjPublicationCreateInput,
  QrjPublicationTranslationCreateInput,
  QrjPublicationTranslationCreateManyInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../utils'

export const createQrjPublication = async (_, { input }, ___: Context) => {
  let schema: QrjPublicationCreateInput = <QrjPublicationCreateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ___)

  schema.translation = <QrjPublicationTranslationCreateManyInput>{}
  schema.translation.create = <QrjPublicationTranslationCreateInput[]>[]

  for (let i = 0; i < input.translation.length; i++) {
    schema.translation.create[i] = <QrjPublicationTranslationCreateInput>{}
    if (input.translation[i].language) {
      schema.translation.create[i].language = {
        connect: { code: input.translation[i].language },
      }
    }
    if (input.translation[i].title) {
      schema.translation.create[i].title = input.translation[i].title
    }
    if (input.translation[i].publicationAuthor) {
      schema.translation.create[i].publicationAuthor =
        input.translation[i].publicationAuthor
    }
    if (input.translation[i].publicationLang) {
      schema.translation.create[i].publicationLang =
        input.translation[i].publicationLang
    }
    if (input.translation[i].abstract) {
      schema.translation.create[i].abstract = input.translation[i].abstract
    }
  }

  return ___.prisma.createQrjPublication({
    ...schema,
  })
}
