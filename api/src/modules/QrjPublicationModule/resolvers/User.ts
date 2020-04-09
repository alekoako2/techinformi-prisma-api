import { Context } from "../../../utils/utils";

export const User = {
  qrjPublications: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).qrjPublications();
  }
};
