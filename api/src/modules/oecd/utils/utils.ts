import { getUser } from '../../../utils'
import { Context } from '@interfaces/apollo/context'
import { OecdWhereInput } from '@prisma-client'

export const setNonTranslatedSchema = async (schema, input, ctx: Context) => {
  const user = await getUser(ctx)

  if (!user) {
    throw new Error('User not authenticated')
  }

  schema.author = {
    connect: {
      email: user.email,
    },
  }

  if (input.code) {
    schema.code = input.code
  }

  return schema
}
export const getWhereInput = query => {
  if (query) {
    const { code, name } = query

    const OR = Array<OecdWhereInput>()

    if (code != undefined) OR.push({ code_contains: code })

    if (name != undefined)
      OR.push({ translation_some: { name_contains: name } })

    return { OR }
  }

  return null
}
