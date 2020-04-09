import { Context } from "../../../utils/utils";

export const Qrj = {
  journal: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrj({ id }).journal();
  },
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrj({ id }).author();
  }
};
