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
  let schema: DepositedCreateInput = {} as DepositedCreateInput

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

  if (oecd) {
    schema.oecd = { connect: { code: oecd } }
  }

  schema.translation = {} as DepositedTranslationCreateManyInput
  schema.translation.create = [] as DepositedTranslationCreateInput[]

  for (let i = 0; i < translation.length; i++) {
    const { title, author, institute, resume, language } = translation[i]

    schema.translation.create[i] = {} as DepositedTranslationCreateInput

    schema.translation.create[i] = {
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
    ...schema,
  })
}
