import { getUser } from '../../../../utils'
import {
  NewsCreateInput,
  NewsTranslationCreateInput,
  NewsTranslationCreateManyInput,
  NewsTranslationUpdateDataInput,
  NewsTranslationUpdateWithWhereUniqueNestedInput,
  NewsTranslationWhereUniqueInput,
  NewsUpdateInput,
  LanguageCreateManyInput,
  LanguageCreateOneInput,
  LanguageUpdateManyInput,
  LanguageWhereUniqueInput,
  OecdCreateManyInput,
  OecdUpdateManyInput,
  OecdWhereUniqueInput,
} from '@prisma-client'
import { Context } from '@interfaces/apollo/context'

async function setNonTranslatedSchema(schema, input, ctx: Context, id?) {
  const user = await getUser(ctx)

  if (!user) {
    throw new Error('User not authenticated')
  }

  schema.author = {
    connect: {
      email: user.email,
    },
  }

  return schema
}

async function createNewsSchema(input, ctx: Context) {
  let schema: NewsCreateInput = <NewsCreateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ctx)

  schema.translation = <NewsTranslationCreateManyInput>{}
  schema.translation.create = <NewsTranslationCreateInput[]>[]

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.create[i] = <NewsTranslationCreateInput>{}

      if (input.translation[i].title) {
        schema.translation.create[i].title = input.translation[i].title
      }
      if (input.translation[i].description) {
        schema.translation.create[i].description =
          input.translation[i].description
      }
      if (input.translation[i].content) {
        schema.translation.create[i].content = input.translation[i].content
      }

      if (input.translation[i].language) {
        schema.translation.create[i].language = <LanguageCreateOneInput>{}
        schema.translation.create[i].language.connect = <
          LanguageWhereUniqueInput
        >{}
        schema.translation.create[i].language.connect.code =
          input.translation[i].language
      }
    }
  }

  return schema
}

async function updateNewsSchema(input, id, ctx: Context) {
  let schema: NewsUpdateInput = <NewsUpdateInput>{}

  schema = await setNonTranslatedSchema(schema, input, ctx, id)

  schema.translation = <NewsTranslationCreateManyInput>{}
  schema.translation.update = <
    NewsTranslationUpdateWithWhereUniqueNestedInput[]
  >[]

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.update[i] = <
        NewsTranslationUpdateWithWhereUniqueNestedInput
      >{}
      schema.translation.update[i].data = <NewsTranslationUpdateDataInput>{}
      schema.translation.update[i].where = <NewsTranslationWhereUniqueInput>{}

      let translation = await ctx.prisma.news({ id }).translation({
        where: { language: { code: input.translation[i].language } },
      })

      if (input.translation[i].title) {
        schema.translation.update[i].data.title = input.translation[i].title
      }
      if (input.translation[i].description) {
        schema.translation.update[i].data.description =
          input.translation[i].description
      }
      if (input.translation[i].content) {
        schema.translation.update[i].data.content = input.translation[i].content
      }
      if (input.translation[i].language) {
        schema.translation.update[i].data.language = <LanguageCreateOneInput>{}
        schema.translation.update[i].data.language.connect = <
          LanguageWhereUniqueInput
        >{}
        schema.translation.update[i].data.language.connect.code =
          input.translation[i].language
      }

      schema.translation.update[i].where.id = translation[0].id
    }
  }

  return schema
}

export const news = {
  async createNews(parent, args, ctx: Context) {
    const input = args.input

    return await ctx.prisma.createNews({
      ...(await createNewsSchema(input, ctx)),
    })
  },

  async updateNews(parent, args, ctx: Context) {
    const { input, id } = args

    const news = await ctx.prisma.news({ id })

    if (!news) {
      throw new Error('News not found!')
    }

    return await ctx.prisma.updateNews({
      data: {
        ...(await updateNewsSchema(input, id, ctx)),
      },
      where: { id },
    })
  },

  async deleteNews(parent, { id }, ctx: Context) {
    const user = await getUser(ctx)

    if (!user) {
      throw new Error('User not authenticated')
    }

    return ctx.prisma.deleteNews({
      id,
    })
  },
}
