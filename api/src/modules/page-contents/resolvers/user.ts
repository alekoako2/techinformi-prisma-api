import { Context } from '@interfaces/apollo/context'

export const User = {
  qrjPublications: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id })
  },
}
