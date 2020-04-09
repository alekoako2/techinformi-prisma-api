import { Context } from "../../../../utils/utils";

export const User = {
  technologyTransferNetworks: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).technologyTransferNetworks();
  }
};
