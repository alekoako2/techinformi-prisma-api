import { getUser } from '../../../utils'
import { Context } from '@interfaces/apollo/context'
import {
  ExpertCreateInput,
  ExpertTranslationWhereInput,
  ExpertWhereInput,
} from '@prisma-client'

export async function setNonTranslatedSchema(
  schema,
  { inpDate, email, web, tel, mobile, publications },
  ctx: Context
) {
  const user = await getUser(ctx)

  if (!user) {
    throw new Error('User not authenticated')
  }

  schema.author = {
    connect: {
      email: user.email,
    },
  }
  if (inpDate) {
    schema.inpDate = inpDate
  }
  if (email) {
    schema.email = email
  }
  if (web) {
    schema.web = web
  }
  if (tel) {
    schema.tel = tel
  }
  if (mobile) {
    schema.mobile = mobile
  }
  if (publications) {
    schema.publications = publications
  }

  return schema
}

export function getWhereInput(query) {
  if (query) {
    const { oecd, translation } = query

    const AND = Array<ExpertWhereInput>()

    if (translation != undefined) {
      let translationAND = Array<ExpertTranslationWhereInput>()
      if (translation.fullName != undefined)
        translationAND.push({
          fullName_contains: translation.fullName,
        })

      if (translation.specialization != undefined)
        translationAND.push({
          specialization_contains: translation.specialization,
        })

      AND.push({ translation_some: { AND: translationAND } })
    }

    if (oecd != undefined) AND.push({ oecds_some: { code: oecd } })

    return { AND }
  }

  return null
}
