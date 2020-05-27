import { Context } from '@interfaces/apollo/context'
import { getUser } from '../../../../utils'

export const deleteQrjPublication = async (parent, { id }, ctx: Context) => {
  const user = await getUser(ctx)

  if (!user) {
    throw new Error('User not authenticated')
  }

  return ctx.prisma.deleteQrjPublication({
    id,
  })
}
