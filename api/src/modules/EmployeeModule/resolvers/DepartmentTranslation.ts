import { Context } from '@interfaces/apollo/context'

export const DepartmentTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.departmentTranslation({ id }).language()
  },
}
