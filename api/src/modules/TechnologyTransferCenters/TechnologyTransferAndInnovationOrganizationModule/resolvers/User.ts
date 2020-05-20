import { Context } from '@interfaces/apollo/context'

export const User = {
  technologyTransferAndInnovationOrganizations: (
    { id },
    args,
    ctx: Context
  ) => {
    return ctx.prisma.user({ id })
  },
}
