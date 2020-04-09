import { Context } from "../../../utils/utils";

export const QrjPublication = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrjPublication({ id }).translation({ where: { language: { code: args.language } } });
  },
  oecd: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrjPublication({ id }).oecd();
  },
  journal: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrjPublication({ id }).journal();
  },
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrjPublication({ id }).author();
  }
};
