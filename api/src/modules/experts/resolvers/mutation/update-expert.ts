import { Context } from '@interfaces/apollo/context'
import {
  ExpertTranslationCreateManyInput,
  ExpertTranslationUpdateDataInput,
  ExpertTranslationUpdateWithWhereUniqueNestedInput,
  ExpertTranslationWhereUniqueInput,
  ExpertUpdateInput,
  LanguageCreateOneInput,
  LanguageUpdateManyInput,
  LanguageWhereUniqueInput,
  OecdTranslationUpdateDataInput,
  OecdTranslationUpdateManyInput,
  OecdTranslationUpdateWithWhereUniqueNestedInput,
  OecdTranslationWhereUniqueInput,
  OecdUpdateInput,
  OecdUpdateManyInput,
  OecdWhereUniqueInput,
  QrjPublicationTranslationUpdateDataInput,
  QrjPublicationTranslationUpdateManyInput,
  QrjPublicationTranslationUpdateWithWhereUniqueNestedInput,
  QrjPublicationTranslationWhereUniqueInput,
  QrjPublicationUpdateInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../utils'

export const updateExpert = async (_, { input, id }, ___: Context) => {
  const expert = await ___.prisma.expert({ id })

  if (!expert) {
    throw new Error('Expert not found!')
  }

  let schema: ExpertUpdateInput = <ExpertUpdateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ___)

  schema.translation = <ExpertTranslationCreateManyInput>{}
  schema.translation.update = <
    ExpertTranslationUpdateWithWhereUniqueNestedInput[]
  >[]

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.update[i] = <
        ExpertTranslationUpdateWithWhereUniqueNestedInput
      >{}
      schema.translation.update[i].data = <ExpertTranslationUpdateDataInput>{}
      schema.translation.update[i].where = <ExpertTranslationWhereUniqueInput>{}

      let translation = await ___.prisma.expert({ id }).translation({
        where: { language: { code: input.translation[i].language } },
      })

      if (input.translation[i].fullName) {
        schema.translation.update[i].data.fullName =
          input.translation[i].fullName
      }
      if (input.translation[i].qualification) {
        schema.translation.update[i].data.qualification =
          input.translation[i].qualification
      }
      if (input.translation[i].academicDegree) {
        schema.translation.update[i].data.academicDegree =
          input.translation[i].academicDegree
      }
      if (input.translation[i].specialization) {
        schema.translation.update[i].data.specialization =
          input.translation[i].specialization
      }
      if (input.translation[i].workingPlace) {
        schema.translation.update[i].data.workingPlace =
          input.translation[i].workingPlace
      }
      if (input.translation[i].position) {
        schema.translation.update[i].data.position =
          input.translation[i].position
      }
      if (input.translation[i].language) {
        schema.translation.update[i].data.language = <LanguageCreateOneInput>{}
        schema.translation.update[i].data.language.connect = <
          LanguageWhereUniqueInput
        >{}
        schema.translation.update[i].data.language.connect.code =
          input.translation[i].language
      }

      schema.translation.update[i].where.id = translation[0].id
    }
  }

  if (input.oecds) {
    schema.oecds = <OecdUpdateManyInput>{}
    schema.oecds.set = <OecdWhereUniqueInput[]>[]
    for (let i = 0; i < input.oecds.length; i++) {
      schema.oecds.set[i] = <OecdWhereUniqueInput>{}
      schema.oecds.set[i].code = input.oecds[i].code
    }
  }

  if (input.languages) {
    schema.languages = <LanguageUpdateManyInput>{}
    schema.languages.set = <LanguageWhereUniqueInput[]>[]
    for (let i = 0; i < input.languages.length; i++) {
      schema.languages.set[i] = <LanguageWhereUniqueInput>{}
      schema.languages.set[i].code = input.languages[i].code
    }
  }

  return ___.prisma.updateExpert({
    data: {
      ...schema,
    },
    where: { id },
  })
}
