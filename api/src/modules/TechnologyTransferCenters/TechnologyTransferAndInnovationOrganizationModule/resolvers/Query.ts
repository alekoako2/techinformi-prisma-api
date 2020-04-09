import { Context } from "../../../../utils/utils";
import {
  TechnologyTransferAndInnovationOrganizationOrderByInput,
  TechnologyTransferAndInnovationOrganizationWhereInput
} from "../../../../generated/prisma-client";

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
      skip: args.skip
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            url_contains: args.query
          }
        ]
      };
    }

    opArgs.orderBy = "createdAt_DESC";

    return ctx.prisma.technologyTransferAndInnovationOrganizations(opArgs);

  },

  countTechnologyTransferAndInnovationOrganizations(parent, args, ctx: Context) {
    return ctx.prisma.technologyTransferAndInnovationOrganizationsConnection().aggregate().count();
  },

  technologyTransferAndInnovationOrganization(parent, { id }, ctx: Context) {
    return ctx.prisma.technologyTransferAndInnovationOrganization({ id });
  }

};
