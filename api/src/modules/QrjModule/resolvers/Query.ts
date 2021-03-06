import { Context } from '@interfaces/apollo/context'
import { QrjOrderByInput, QrjWhereInput } from '@prisma-client'

interface opArgs {
  first: String
  skip: String
  where?: QrjWhereInput
  orderBy?: QrjOrderByInput
}

export const Query = {
  qrjs(parent, args, ctx: Context) {
    const opArgs: opArgs = {
      first: args.first,
      skip: args.skip,
    }

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            year_contains: args.query,
          },
        ],
      }
    }

    opArgs.orderBy = 'createdAt_DESC'

    return ctx.prisma.qrjs()
  },

  countQrjs(parent, args, ctx: Context) {
    return ctx.prisma
      .qrjsConnection()
      .aggregate()
      .count()
  },

  qrj(parent, { id }, ctx: Context) {
    return ctx.prisma.qrj({ id })
  },
}
