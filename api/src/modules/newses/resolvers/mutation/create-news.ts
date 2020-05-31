import { Context } from '@interfaces/apollo/context'
import {
  NewsCreateInput,
  NewsTranslationCreateInput,
  NewsTranslationCreateManyInput,
} from '@prisma-client'
import { getUser } from '../../../../utils'

export const createNews = async (
  _,
  { input: { translation } },
  ___: Context
) => {
  const user = await getUser(___)

  if (!user) {
    throw new Error('User not authenticated')
  }

  let schema: NewsCreateInput = <NewsCreateInput>{}

  schema = {
    author: {
      connect: {
        email: user.email,
      },
    },
  }

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
