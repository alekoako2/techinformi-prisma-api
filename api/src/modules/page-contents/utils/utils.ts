import {
  QrjPublicationTranslationWhereInput,
  QrjPublicationWhereInput,
} from '@prisma-client'

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
