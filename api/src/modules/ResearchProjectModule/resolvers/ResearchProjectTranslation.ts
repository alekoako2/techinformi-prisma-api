import { Context } from '@interfaces/apollo/context'

export const ResearchProjectTranslation = {
  language: ({ id }, args, ctx: Context) => {
    return ctx.prisma.researchProjectTranslation({ id }).language()
  },
  key: ({ id }, args, ctx: Context) => {
    return ctx.prisma.researchProjectTranslation({ id }).key()
  },
}
