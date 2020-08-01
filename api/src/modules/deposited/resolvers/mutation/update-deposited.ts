import { Context } from '@interfaces/apollo/context'
import {
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

  return ___.prisma.updateDeposited({
    data: {
      ...schema,
    },
    where: { id },
  })
}
