import { Context } from '@interfaces/apollo/context'

export const User = {
  oecds: ({ id }, args, ctx: Context) => ctx.prisma.user({ id }).oecds(),
}
