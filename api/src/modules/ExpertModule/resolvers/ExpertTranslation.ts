import { Context } from "../../../utils/utils";

export const ExpertTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.expertTranslation({ id }).language();
  }
};
