import {
  DepositedTranslationWhereInput,
  DepositedWhereInput,
} from '@prisma-client'

export function getWhereInput(query) {
  if (query) {
    const { index, translation, oecd, year, uak } = query

    const AND = Array<DepositedWhereInput>()

    if (index != undefined) AND.push({ index_contains: index })

    if (uak != undefined) AND.push({ uak_contains: uak })

    if (translation != undefined) {
      let translationAND = Array<DepositedTranslationWhereInput>()
      if (translation.title != undefined)
        translationAND.push({
          title_contains: translation.title,
        })

      if (translation.author != undefined)
        translationAND.push({ author_contains: translation.author })

      if (translation.institute != undefined)
        translationAND.push({ institute_contains: translation.institute })

      AND.push({ translation_some: { AND: translationAND } })
    }

    if (oecd != undefined) AND.push({ oecd: { code_contains: oecd } })

    if (year != undefined) AND.push({ year_gte: year })

    return { AND }
  }

  return null
}
