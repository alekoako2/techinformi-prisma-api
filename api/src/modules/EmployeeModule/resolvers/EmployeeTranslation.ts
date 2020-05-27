import { Context } from '@interfaces/apollo/context'

export const EmployeeTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.employeeTranslation({ id }).language()
  },
}
