import { Context } from "../../../../utils/utils";
import {
  TechnologyTransferNetworkOrderByInput,
  TechnologyTransferNetworkWhereInput
} from "../../../../generated/prisma-client";

interface opArgs {
  first: String
  skip: String
  where?: TechnologyTransferNetworkWhereInput
  orderBy?: TechnologyTransferNetworkOrderByInput
}

export const Query = {

  technologyTransferNetworks(parent, args, ctx: Context) {
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

    return ctx.prisma.technologyTransferNetworks(opArgs);

  },

  countTechnologyTransferNetworks(parent, args, ctx: Context) {
    return ctx.prisma.technologyTransferNetworksConnection().aggregate().count();
  },

  technologyTransferNetwork(parent, { id }, ctx: Context) {
    return ctx.prisma.technologyTransferNetwork({ id });
  }

};
