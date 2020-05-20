import { Context } from '@interfaces/apollo/context'

export const Department = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma
      .department({ id })
      .translation({ where: { language: { code: args.language } } })
  },
}
