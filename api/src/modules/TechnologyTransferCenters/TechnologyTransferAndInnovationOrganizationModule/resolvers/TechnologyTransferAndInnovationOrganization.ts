import { Context } from '@interfaces/apollo/context'

export const TechnologyTransferAndInnovationOrganization = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma
      .technologyTransferAndInnovationOrganization({ id })
      .author()
  },
}
