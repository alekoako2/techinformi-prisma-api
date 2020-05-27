import { Context } from '@interfaces/apollo/context'

export const translation = ({ id }, args, ctx: Context) =>
  ctx.prisma
    .user({ id })
    .translation({ where: { language: { code: args.language } } })
