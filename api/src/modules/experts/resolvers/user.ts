import { Context } from '@interfaces/apollo/context'

export const User = {
  experts: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id })
  },
}
