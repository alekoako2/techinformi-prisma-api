import { Context } from "../../../utils/utils";

export const Journal = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.journal({ id }).translation({ where: { language: { code: args.language } } });
  }
};
