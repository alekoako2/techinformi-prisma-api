import { Context } from '@interfaces/apollo/context'
import { getUser } from '../../../../utils'

export async function deleteExpert(parent, { id }, ctx: Context) {
  const user = await getUser(ctx)

  if (!user) {
    throw new Error('User not authenticated')
  }

  return ctx.prisma.deleteExpert({
    id,
  })
}
