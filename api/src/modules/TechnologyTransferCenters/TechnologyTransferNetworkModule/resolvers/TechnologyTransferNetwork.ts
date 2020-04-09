import { Context } from "../../../../utils/utils";

export const TechnologyTransferNetwork = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.technologyTransferNetwork({ id }).author();
  }
};
