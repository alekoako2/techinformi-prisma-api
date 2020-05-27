import { Context } from '@interfaces/apollo/context'
import {
  QrjPublicationTranslationUpdateDataInput,
  QrjPublicationTranslationUpdateManyInput,
  QrjPublicationTranslationUpdateWithWhereUniqueNestedInput,
  QrjPublicationTranslationWhereUniqueInput,
  QrjPublicationUpdateInput,
} from '@prisma-client'
import {
  setNonTranslatedSchema,
  setNonTranslatedUpdateSchema,
} from '../../utils'

export const updateQrjPublication = async (_, { input }, ___: Context) => {
  const { id } = input

  const qrjPublication = await ___.prisma.qrjPublication({ id })

  if (!qrjPublication) {
    throw new Error('QrjPublication not found!')
  }

  let schema: QrjPublicationUpdateInput = {} as QrjPublicationUpdateInput
  schema = await setNonTranslatedUpdateSchema(schema, input, ___)

  schema.translation = {} as QrjPublicationTranslationUpdateManyInput
  schema.translation.update = [] as QrjPublicationTranslationUpdateWithWhereUniqueNestedInput[]

  for (let i = 0; i < input.translation.length; i++) {
    schema.translation.update[
      i
    ] = {} as QrjPublicationTranslationUpdateWithWhereUniqueNestedInput

    schema.translation.update[
      i
    ].where = {} as QrjPublicationTranslationWhereUniqueInput

    schema.translation.update[
      i
    ].data = {} as QrjPublicationTranslationUpdateDataInput

    let translation = await ___.prisma.qrjPublication({ id }).translation({
      where: { language: { code: input.translation[i].language } },
    })

    if (input.translation[i].title) {
      schema.translation.update[i].data.title = input.translation[i].title
    }
    if (input.translation[i].publicationAuthor) {
      schema.translation.update[i].data.publicationAuthor =
        input.translation[i].publicationAuthor
    }
    if (input.translation[i].publicationLang) {
      schema.translation.update[i].data.publicationLang =
        input.translation[i].publicationLang
    }

    if (input.translation[i].abstract) {
      schema.translation.update[i].data.abstract = input.translation[i].abstract
    }

    schema.translation.update[i].where.id = translation[0].id
  }

  return ___.prisma.updateQrjPublication({
    data: {
      ...schema,
    },
    where: { id },
  })
}
