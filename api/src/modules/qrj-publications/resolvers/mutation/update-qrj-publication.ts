import { Context } from '@interfaces/apollo/context'
import {
  OecdTranslationUpdateDataInput,
  OecdTranslationUpdateManyInput,
  OecdTranslationUpdateWithWhereUniqueNestedInput,
  OecdTranslationWhereUniqueInput,
  OecdUpdateInput,
  QrjPublicationTranslationUpdateDataInput,
  QrjPublicationTranslationUpdateManyInput,
  QrjPublicationTranslationUpdateWithWhereUniqueNestedInput,
  QrjPublicationTranslationWhereUniqueInput,
  QrjPublicationUpdateInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../../oecd/utils'

export const updateQrjPublication = async (_, { input, id }, ___: Context) => {
  const qrjPublication = await ___.prisma.qrjPublication({ id })

  if (!qrjPublication) {
    throw new Error('QrjPublication not found!')
  }
  let schema: QrjPublicationUpdateInput = <QrjPublicationUpdateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ___)

  schema.translation = <QrjPublicationTranslationUpdateManyInput>{}
  schema.translation.update = <
    QrjPublicationTranslationUpdateWithWhereUniqueNestedInput[]
  >[]

  for (let i = 0; i < input.translation.length; i++) {
    schema.translation.update[i] = <
      QrjPublicationTranslationUpdateWithWhereUniqueNestedInput
    >{}
    schema.translation.update[i].where = <
      QrjPublicationTranslationWhereUniqueInput
    >{}
    schema.translation.update[i].data = <
      QrjPublicationTranslationUpdateDataInput
    >{}

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
