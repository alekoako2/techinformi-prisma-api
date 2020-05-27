import { Context } from '@interfaces/apollo/context'

export const User = {
  technologyTransferNetworks: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id })
  },
}
