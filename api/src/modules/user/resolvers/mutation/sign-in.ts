import { Context } from '@interfaces/apollo/context'

import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export const signIn = async (parent, { input }, ctx: Context) => {
  const email = input.email
  const password = input.password

  const user = await ctx.prisma.user({ email })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: '24h',
    }),
    user,
  }
}
