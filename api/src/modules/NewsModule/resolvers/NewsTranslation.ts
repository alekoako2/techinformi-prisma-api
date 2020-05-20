import { Context } from '@interfaces/apollo/context'

export const NewsTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.newsTranslation({ id }).language()
  },
}
