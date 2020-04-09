import { Context } from "../../../utils/utils";

export const User = {
  newses: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).newses();
  }
};
