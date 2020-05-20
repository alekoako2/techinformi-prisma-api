import { getUser } from '../../../utils'
import { Context } from '@interfaces/apollo/context'
import {
  QrjPublicationCreateInput,
  QrjPublicationTranslationWhereInput,
  QrjPublicationWhereInput,
} from '@prisma-client'

export async function setNonTranslatedSchema(
  schema: QrjPublicationCreateInput,
  { index, year, number, pages, inputDate, journal, oecd },
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
  if (index) {
    schema.index = index
  }
  if (year) {
    schema.year = year
  }
  if (number) {
    schema.number = number
  }
  if (pages) {
    schema.pages = pages
  }
  if (inputDate) {
    schema.inputDate = inputDate
  }
  if (journal) {
    schema.journal = { connect: { code: journal } }
  }
  if (oecd) {
    schema.oecd = { connect: { code: oecd } }
  }

  schema.edited = true

  return schema
}

export function getWhereInput(query) {
  if (query) {
    const {
      index,
      translation,
      qrjJournal,
      oecd,
      keywords,
      yearStart,
      yearEnd,
    } = query

    const AND = Array<QrjPublicationWhereInput>()

    if (index != undefined) AND.push({ index_contains: index })

    if (translation != undefined) {
      let translationAND = Array<QrjPublicationTranslationWhereInput>()
      if (translation.publicationAuthor != undefined)
        translationAND.push({
          publicationAuthor_contains: translation.publicationAuthor,
        })

      if (translation.title != undefined)
        translationAND.push({ title_contains: translation.title })

      AND.push({ translation_some: { AND: translationAND } })
      console.log(AND)
    }

    if (qrjJournal != undefined)
      AND.push({ journal: { code_contains: qrjJournal } })

    if (oecd != undefined) AND.push({ oecd: { code_contains: oecd } })

    // check keywords here

    if (yearStart != undefined) AND.push({ inputDate_gte: yearStart })

    if (yearEnd != undefined) AND.push({ inputDate_lte: yearEnd })

    return { AND }
  }

  return null
}
