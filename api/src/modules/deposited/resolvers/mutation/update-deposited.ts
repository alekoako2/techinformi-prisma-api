import { Context } from '@interfaces/apollo/context'
import {
  DepositedCreateInput,
  DepositedTranslationCreateInput,
  DepositedTranslationCreateManyInput,
  DepositedTranslationUpdateDataInput,
  DepositedTranslationUpdateManyInput,
  DepositedTranslationUpdateWithWhereUniqueNestedInput,
  DepositedTranslationWhereUniqueInput,
  DepositedUpdateInput,
} from '@prisma-client'
import { getUser } from '../../../../utils'

export const updateDeposited = async (
  _,
  { input: { id, index, year, uak, oecd, translation } },
  ___: Context
) => {
  const deposited = await ___.prisma.deposited({ id })

  if (!deposited) {
    throw new Error('Deposited not found!')
  }

  let schema: DepositedUpdateInput = {} as DepositedUpdateInput

  const user = await getUser(___)

  if (!user) {
    throw new Error('User not authenticated')
  }

  schema = {
    index,
    year,
    uak,
    author: {
      connect: {
        email: user.email,
      },
    },
  }
  if (oecd) schema.oecd = { connect: { code: oecd } }

  schema.translation = {} as DepositedTranslationUpdateManyInput
  schema.translation.update = [] as DepositedTranslationUpdateWithWhereUniqueNestedInput[]

  if (translation)
    for (let i = 0; i < translation.length; i++) {
      const { title, author, institute, resume, language, id } = translation[i]

      schema.translation.update[
        i
      ] = {} as DepositedTranslationUpdateWithWhereUniqueNestedInput

      schema.translation.update[
        i
      ].where = {} as DepositedTranslationWhereUniqueInput

      schema.translation.update[
        i
      ].data = {} as DepositedTranslationUpdateDataInput

      schema.translation.update[i].data = {
        title,
        author,
        institute,
        resume,
        language: {
          connect: { code: language },
        },
      }

      schema.translation.update[i].where = { id }
    }

  let createSchema: DepositedCreateInput = {} as DepositedCreateInput

  createSchema = {
    index,
    year,
    uak,
    author: {
      connect: {
        email: user.email,
      },
    },
  }

  if (oecd) {
    createSchema.oecd = { connect: { code: oecd } }
  }

  createSchema.translation = {} as DepositedTranslationCreateManyInput
  createSchema.translation.create = [] as DepositedTranslationCreateInput[]

  if (translation)
    for (let i = 0; i < translation.length; i++) {
      const { title, author, institute, resume, language } = translation[i]

      createSchema.translation.create[i] = {} as DepositedTranslationCreateInput

      createSchema.translation.create[i] = {
        title,
        author,
        institute,
        resume,
        language: {
          connect: { code: language },
        },
      }
    }

  return ___.prisma.upsertDeposited({
    update: {
      ...schema,
    },
    create: {
      ...createSchema,
    },
    where: { id },
  })
}
