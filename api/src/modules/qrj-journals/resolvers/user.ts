import { Context } from '@interfaces/apollo/context'

export const User = {
  qrjJournals: ({ id }, args, ctx: Context) => ctx.prisma.user({ id }),
}
