import { Context } from "../../../utils/utils";

export const User = {
  qrjs: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).qrjs();
  }
};
