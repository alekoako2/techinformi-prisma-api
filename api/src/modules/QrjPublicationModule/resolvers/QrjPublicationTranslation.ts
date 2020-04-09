import { Context } from "../../../utils/utils";

export const QrjPublicationTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.qrjPublicationTranslation({ id }).language();
  }
};
