import { Context } from "../../../utils/utils";

export const User = {
  experts: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).experts();
  }
};
