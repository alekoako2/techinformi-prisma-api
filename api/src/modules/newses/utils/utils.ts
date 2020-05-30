import { NewsTranslationWhereInput, NewsWhereInput } from '@prisma-client'

export function getWhereInput(query) {
  if (query) {
    const { translation } = query

    const AND = Array<NewsWhereInput>()

    if (translation != undefined) {
      let translationAND = Array<NewsTranslationWhereInput>()
      if (translation.title != undefined)
        translationAND.push({
          title_contains: translation.title,
        })

      if (translation.description != undefined)
        translationAND.push({
          description_contains: translation.description,
        })

      if (translation.content != undefined)
        translationAND.push({
          content_contains: translation.content,
        })

      AND.push({ translation_some: { AND: translationAND } })
    }

    return { AND }
  }

  return null
}
