import { Context } from "../../../utils/utils";

export const EmployeeTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.employeeTranslation({ id }).language();
  }
};
