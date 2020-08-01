import * as jwt from 'jsonwebtoken'
import { Context } from '@interfaces/apollo/context'

export function getUserId({ req }: Context) {
  const Authorization = req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    try {
      const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
        userId: string
      }
      return userId
    } catch (error) {
      if (error.message === 'jwt expired') throw new ExpiredError()
      else throw new MalformedError()
    }
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

export class ExpiredError extends Error {
  constructor() {
    super('jwt expired')
  }
}

export class MalformedError extends Error {
  constructor() {
    super('jwt malformed')
  }
}
