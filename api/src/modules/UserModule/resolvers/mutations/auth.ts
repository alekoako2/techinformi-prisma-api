import { Context } from "../../../../utils/utils";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export const auth = {
  async signup(parent, args, ctx: Context) {
    const input = args.input;

    const password = await bcrypt.hash(input.password, 10);
    const user = await ctx.prisma.createUser(
      {
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
                  code: input.translation[0].language
                }
              }
            },
            {
              firstName: input.translation[1].firstName,
              lastName: input.translation[1].lastName,
              language: {
                connect: {
                  code: input.translation[1].language
                }
              }
            }
          ]
        }
      }
    );

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  },

  async login(parent, { input }, ctx: Context) {
    const email = input.email;
    const password = input.password;

    const user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  }
};
