import { Context } from "../../../utils/utils";

export const DepartmentTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.departmentTranslation({ id }).language();
  }
};
