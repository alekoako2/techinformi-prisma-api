import { Context } from "../../../utils/utils";

export const EmployeePositionTranslation = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.employeePositionTranslation({ id }).language();
  }
};
