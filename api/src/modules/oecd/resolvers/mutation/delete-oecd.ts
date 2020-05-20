import { getUser } from '../../../../utils'
import { Context } from '@interfaces/apollo/context'

export const deleteOecd = async (parent, { id }, ctx: Context) => {
  const user = await getUser(ctx)

  if (!user) {
    throw new Error('User not authenticated')
  }

  return ctx.prisma.deleteOecd({
    id,
  })
}
