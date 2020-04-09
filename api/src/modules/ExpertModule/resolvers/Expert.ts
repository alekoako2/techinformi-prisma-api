import { Context } from "../../../utils/utils";

export const Expert = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.expert({ id }).translation({ where: { language: { code: args.language } } });
  },
  oecds: ({ id }, args, ctx: Context) => {
    return ctx.prisma.expert({ id }).oecds();
  },
  languages: ({ id }, args, ctx: Context) => {
    return ctx.prisma.expert({ id }).languages();
  },
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.expert({ id }).author();
  }
};
