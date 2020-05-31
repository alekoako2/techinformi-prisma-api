import { Context } from '@interfaces/apollo/context'
import {
  NewsTranslationUpdateWithWhereUniqueNestedInput,
  NewsTranslationWhereUniqueInput,
  NewsTranslationUpdateDataInput,
  NewsTranslationUpdateManyInput,
  NewsUpdateInput,
} from '@prisma-client'
import { getUser } from '../../../../utils'

export const updateNews = async (
  _,
  { input: { id, translation } },
  ___: Context
) => {
  const news = await ___.prisma.news({ id })

  if (!news) {
    throw new Error('News not found!')
  }

  const user = await getUser(___)

  if (!user) {
    throw new Error('User not authenticated')
  }

  let schema: NewsUpdateInput = {} as NewsUpdateInput

  schema.translation = {} as NewsTranslationUpdateManyInput
  schema.translation.update = [] as NewsTranslationUpdateWithWhereUniqueNestedInput[]

  for (let i = 0; i < translation.length; i++) {
    const { title, description, content, language, id } = translation[i]

    schema.translation.update[
      i
    ] = {} as NewsTranslationUpdateWithWhereUniqueNestedInput

    schema.translation.update[i].where = {} as NewsTranslationWhereUniqueInput

    schema.translation.update[i].data = {} as NewsTranslationUpdateDataInput

    schema.translation.update[i].data = {
      title,
      description,
      content,
      language: {
        connect: { code: language },
      },
    }
    schema.translation.update[i].where = { id }
    console.log(language, id)
  }

  return ___.prisma.updateNews({
    data: {
      ...schema,
    },
    where: { id },
  })
}
