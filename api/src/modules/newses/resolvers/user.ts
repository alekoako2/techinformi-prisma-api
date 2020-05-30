import { Context } from '@interfaces/apollo/context'

export const User = {
  newses: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id })
  },
}
