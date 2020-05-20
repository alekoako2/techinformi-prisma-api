import { Context } from '@interfaces/apollo/context'

export const User = {
  qrjs: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id })
  },
}
