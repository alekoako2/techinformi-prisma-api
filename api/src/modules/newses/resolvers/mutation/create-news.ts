import { Context } from '@interfaces/apollo/context'
import {
  NewsCreateInput,
  NewsTranslationCreateInput,
  NewsTranslationCreateManyInput,
} from '@prisma-client'

export const createNews = async (
  _,
  { input: { translation } },
  ___: Context
) => {
  let schema: NewsCreateInput = <NewsCreateInput>{}

  schema.translation = <NewsTranslationCreateManyInput>{}
  schema.translation.create = <NewsTranslationCreateInput[]>[]

  for (let i = 0; i < translation.length; i++) {
    const { title, description, content, language } = translation[i]

    schema.translation.create[i] = <NewsTranslationCreateInput>{}

    schema.translation.create[i] = {
      title,
      description,
      content,
      language: {
        connect: { code: language },
      },
    }
  }

  return ___.prisma.createNews({
    ...schema,
  })
}
