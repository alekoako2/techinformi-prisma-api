import { Context } from '@interfaces/apollo/context'

export const EmployeePositionTranslation = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.employeePositionTranslation({ id }).language()
  },
}
