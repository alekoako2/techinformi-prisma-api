import { Context } from '@interfaces/apollo/context'

export const TechnologyTransferNetwork = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.technologyTransferNetwork({ id }).author()
  },
}
