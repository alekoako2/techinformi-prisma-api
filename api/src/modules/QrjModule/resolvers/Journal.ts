import { Context } from '@interfaces/apollo/context'

export const Journal = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma
      .journal({ id })
      .translation({ where: { language: { code: args.language } } })
  },
}
