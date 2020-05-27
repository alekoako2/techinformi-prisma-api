import { Context } from '@interfaces/apollo/context'
import { getUserId } from '../../../../utils'

export const me = (_, __, { req, prisma }: Context) =>
  prisma.user({ id: getUserId(req) })
