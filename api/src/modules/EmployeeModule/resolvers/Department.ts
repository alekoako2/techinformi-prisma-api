import { Context } from "../../../utils/utils";

export const Department = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.department({ id }).translation({ where: { language: { code: args.language } } });
  }
};
