import { Context } from "../../../../utils/utils";

export const User = {
  technologyTransferAndInnovationOrganizations: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).technologyTransferAndInnovationOrganizations();
  }
};
