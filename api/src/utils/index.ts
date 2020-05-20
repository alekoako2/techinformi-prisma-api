import * as jwt from 'jsonwebtoken'
import { Context } from '@interfaces/apollo/context'

export function getUserId({ req }: Context) {
  const Authorization = req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string
    }
    return userId
  }

  throw new AuthError()
}

export function getUser(ctx: Context) {
  const id = getUserId(ctx)
  return ctx.prisma.user({ id })
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
