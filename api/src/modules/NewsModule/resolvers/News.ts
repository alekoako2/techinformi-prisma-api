import { Context } from '@interfaces/apollo/context'

export const News = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma
      .news({ id })
      .translation({ where: { language: { code: args.language } } })
  },
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.news({ id }).author()
  },
}
