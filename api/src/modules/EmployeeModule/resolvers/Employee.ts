import { Context } from "../../../utils/utils";

export const Employee = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.employee({ id }).translation({ where: { language: { code: args.language } } });
  },
  department: ({ id }, args, ctx: Context) => {
    return ctx.prisma.employee({ id }).department();
  },
  position: ({ id }, args, ctx: Context) => {
    return ctx.prisma.employee({ id }).position();
  }
};
