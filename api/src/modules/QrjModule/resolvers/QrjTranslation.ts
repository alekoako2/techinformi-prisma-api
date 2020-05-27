import { Context } from '@interfaces/apollo/context'

export const QrjTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrjTranslation({ id }).language()
  },
}
