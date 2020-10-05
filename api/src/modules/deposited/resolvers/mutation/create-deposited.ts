import { Context } from '@interfaces/apollo/context'
import {
  DepositedCreateInput,
  DepositedTranslationCreateInput,
  DepositedTranslationCreateManyInput,
} from '@prisma-client'
import { getUser } from '../../../../utils'

export const createDeposited = async (
  _,
  { input: { index, year, uak, oecd, translation } },
  ___: Context
) => {
  let createSchema: DepositedCreateInput = {} as DepositedCreateInput

  const user = await getUser(___)

  if (!user) {
    throw new Error('User not authenticated')
  }

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

  return ___.prisma.createDeposited({
    ...createSchema,
  })
}
