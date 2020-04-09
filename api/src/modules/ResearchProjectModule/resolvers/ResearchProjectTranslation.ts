import { Context } from "../../../utils/utils";

export const ResearchProjectTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.researchProjectTranslation({ id }).language();
  },
  key: ({ id }, args, ctx: Context) => {
    return ctx.prisma.researchProjectTranslation({ id }).key();
  }
};
