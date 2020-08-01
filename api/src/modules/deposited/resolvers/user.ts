import { Context } from '@interfaces/apollo/context'

export const User = {
  depositeds: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id })
  },
}
