import {
  OecdTranslationUpdateDataInput,
  OecdTranslationUpdateManyInput,
  OecdTranslationUpdateWithWhereUniqueNestedInput,
  OecdTranslationWhereUniqueInput,
  OecdUpdateInput,
} from '@prisma-client'
import { setNonTranslatedSchema } from '../../utils'
import { Context } from '@interfaces/apollo/context'

export const updateOecd = async (_, { input, id }, ___: Context) => {
  const oecd = await ___.prisma.oecd({ id })

  if (!oecd) {
    throw new Error('oecds not found!')
  }

  let schema: OecdUpdateInput = <OecdUpdateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ___)

  schema.translation = <OecdTranslationUpdateManyInput>{}
  schema.translation.update = <
    OecdTranslationUpdateWithWhereUniqueNestedInput[]
  >[]

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.update[i] = <
        OecdTranslationUpdateWithWhereUniqueNestedInput
      >{}
      schema.translation.update[i].where = <OecdTranslationWhereUniqueInput>{}
      schema.translation.update[i].data = <OecdTranslationUpdateDataInput>{}

      let translation = await ___.prisma.oecd({ id }).translation({
        where: { language: { code: input.translation[i].language } },
      })
      if (input.translation[i].name) {
        schema.translation.update[i].data.name = input.translation[i].name
      }
      schema.translation.update[i].where.id = translation[0].id
    }
  }

  return ___.prisma.updateOecd({
    data: {
      ...schema,
    },
    where: { id },
  })
}
