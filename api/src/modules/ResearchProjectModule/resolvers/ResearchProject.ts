import { Context } from "../../../utils/utils";

export const ResearchProject = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.researchProject({ id }).translation({ where: { language: { code: args.language } } });
  },
  oecds: ({ id }, args, ctx: Context) => {
    return ctx.prisma.researchProject({ id }).oecds();
  },
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.researchProject({ id }).author();
  }
};
