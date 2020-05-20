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
    if (schema.translation[i].language) {
      schema.translation.create[i].language = {
        connect: { code: input.translation[i].language },
      }
    }
    if (schema.translation[i].title) {
      schema.translation.create[i].title = input.translation[i].title
    }
    if (schema.translation[i].publicationAuthor) {
      schema.translation.create[i].publicationAuthor =
        input.translation[i].publicationAuthor
    }
    if (schema.translation[i].publicationLang) {
      schema.translation.create[i].publicationLang =
        input.translation[i].publicationLang
    }
    if (schema.translation[i].abstract) {
      schema.translation.create[i].abstract = input.translation[i].abstract
    }
  }

  return ___.prisma.createQrjPublication({
    ...schema,
  })
}
