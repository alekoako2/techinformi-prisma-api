import { Context } from '@interfaces/apollo/context'

export const EmployeePosition = {
  translation: ({ id }, args, ctx: Context) => {
    return ctx.prisma
      .employeePosition({ id })
      .translation({ where: { language: { code: args.language } } })
  },
}
