import { Context } from "../../../utils/utils";

export const QrjTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrjTranslation({ id }).language();
  }
};
