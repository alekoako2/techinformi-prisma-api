import { Context } from '@interfaces/apollo/context'

import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export const signUp = async (parent, args, ctx: Context) => {
  const input = args.input

  const password = await bcrypt.hash(input.password, 10)
  const user = await ctx.prisma.createUser({
    email: input.email,
    password,
    role: input.role,
    translation: {
      create: [
        {
          firstName: input.translation[0].firstName,
          lastName: input.translation[0].lastName,
          language: {
            connect: {
              code: input.translation[0].language,
            },
          },
        },
        {
          firstName: input.translation[1].firstName,
          lastName: input.translation[1].lastName,
          language: {
            connect: {
              code: input.translation[1].language,
            },
          },
        },
      ],
    },
  })

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}
