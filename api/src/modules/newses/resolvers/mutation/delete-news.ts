import { Context } from '@interfaces/apollo/context'
import { getUser } from '../../../../utils'

export const deleteNews = async (parent, { id }, ___: Context) => {
  const user = await getUser(___)

  if (!user) {
    throw new Error('User not authenticated')
  }

  return ___.prisma.deleteNews({
    id,
  })
}
