import { Context } from "../../../utils/utils";

export const User = {
  researchProjects: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).researchProjects();
  }
};
