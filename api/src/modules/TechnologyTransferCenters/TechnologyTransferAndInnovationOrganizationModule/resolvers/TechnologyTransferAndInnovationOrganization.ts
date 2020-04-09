import { Context } from "../../../../utils/utils";

export const TechnologyTransferAndInnovationOrganization = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.technologyTransferAndInnovationOrganization({ id }).author();
  }
};
