import {
  TechnologyTransferAndInnovationOrganizationOrderByInput,
  TechnologyTransferAndInnovationOrganizationWhereInput,
} from '@prisma-client'
import { Context } from '@interfaces/apollo/context'

interface opArgs {
  first: String
  skip: String
  where?: TechnologyTransferAndInnovationOrganizationWhereInput
  orderBy?: TechnologyTransferAndInnovationOrganizationOrderByInput
}

export const Query = {
  technologyTransferAndInnovationOrganizations(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip,
    }

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            url_contains: args.query,
          },
        ],
      }
    }

    opArgs.orderBy = 'createdAt_DESC'

    return ctx.prisma.technologyTransferAndInnovationOrganizations()
  },

  countTechnologyTransferAndInnovationOrganizations(
    parent,
    args,
    ctx: Context
  ) {
    return ctx.prisma
      .technologyTransferAndInnovationOrganizationsConnection()
      .aggregate()
      .count()
  },

  technologyTransferAndInnovationOrganization(parent, { id }, ctx: Context) {
    return ctx.prisma.technologyTransferAndInnovationOrganization({ id })
  },
}
