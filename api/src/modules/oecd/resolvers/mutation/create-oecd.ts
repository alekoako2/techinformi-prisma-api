import { Context } from '@interfaces/apollo/context'
import {
  LanguageCreateOneInput,
  OecdCreateInput,
  OecdTranslationCreateInput,
  OecdTranslationCreateManyInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../utils'

export const createOecd = async (_, { input }, ___: Context) => {
  let schema: OecdCreateInput = <OecdCreateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ___)

  schema.translation = <OecdTranslationCreateManyInput>{}
  schema.translation.create = <OecdTranslationCreateInput[]>[]

  for (let i = 0; i < input.translation.length; i++) {
    schema.translation.create[i] = <OecdTranslationCreateInput>{}
    schema.translation.create[i].language = <LanguageCreateOneInput>{}
    if (input.translation[i].language) {
      schema.translation.create[i].language = {
        connect: { code: input.translation[i].language },
      }
    }
    if (input.translation[i].name) {
      schema.translation.create[i].name = input.translation[i].name
    }
  }

  return ___.prisma.createOecd({
    ...schema,
  })
}
