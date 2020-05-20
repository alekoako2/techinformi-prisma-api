import { Context } from '@interfaces/apollo/context'
import {
  ExpertCreateInput,
  ExpertTranslationCreateInput,
  ExpertTranslationCreateManyInput,
  LanguageCreateManyInput,
  LanguageCreateOneInput,
  LanguageWhereUniqueInput,
  OecdCreateManyInput,
  OecdWhereUniqueInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../utils'

export const createExpert = async (_, { input }, ___: Context) => {
  let schema: ExpertCreateInput = <ExpertCreateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ___)

  schema.translation = <ExpertTranslationCreateManyInput>{}
  schema.translation.create = <ExpertTranslationCreateInput[]>[]

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.create[i] = <ExpertTranslationCreateInput>{}

      if (input.translation[i].fullName) {
        schema.translation.create[i].fullName = input.translation[i].fullName
      }
      if (input.translation[i].qualification) {
        schema.translation.create[i].qualification =
          input.translation[i].qualification
      }
      if (input.translation[i].academicDegree) {
        schema.translation.create[i].academicDegree =
          input.translation[i].academicDegree
      }
      if (input.translation[i].specialization) {
        schema.translation.create[i].specialization =
          input.translation[i].specialization
      }
      if (input.translation[i].workingPlace) {
        schema.translation.create[i].workingPlace =
          input.translation[i].workingPlace
      }
      if (input.translation[i].position) {
        schema.translation.create[i].position = input.translation[i].position
      }
      if (input.translation[i].language) {
        schema.translation.create[i].language = <LanguageCreateOneInput>{}
        schema.translation.create[i].language.connect = <
          LanguageWhereUniqueInput
        >{}
        schema.translation.create[i].language.connect.code =
          input.translation[i].language
      }
    }
  }

  if (input.oecds) {
    schema.oecds = <OecdCreateManyInput>{}
    schema.oecds.connect = <OecdWhereUniqueInput[]>[]
    for (let i = 0; i < input.oecds.length; i++) {
      schema.oecds.connect[i] = <OecdWhereUniqueInput>{}
      schema.oecds.connect[i].code = input.oecds[i].code
    }
  }

  if (input.languages) {
    schema.languages = <LanguageCreateManyInput>{}
    schema.languages.connect = <LanguageWhereUniqueInput[]>[]
    for (let i = 0; i < input.languages.length; i++) {
      schema.languages.connect[i] = <LanguageWhereUniqueInput>{}
      schema.languages.connect[i].code = input.languages[i].code
    }
  }

  return ___.prisma.createExpert({
    ...schema,
  })
}
