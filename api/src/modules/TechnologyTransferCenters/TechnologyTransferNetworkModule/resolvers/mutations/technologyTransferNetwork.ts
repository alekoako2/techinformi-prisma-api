import { getUser } from '../../../../../utils'
import {
  TechnologyTransferNetworkCreateInput,
  TechnologyTransferNetworkUpdateInput,
} from '@prisma-client'
import { Context } from '@interfaces/apollo/context'

async function setNonTranslatedSchema(schema, input, ctx: Context, id?) {
  const user = await getUser(ctx)

  if (!user) {
    throw new Error('User not authenticated')
  }

  schema.author = {
    connect: {
      email: user.email,
    },
  }

  if (input.url) {
    schema.url = input.url
  }
  if (input.title) {
    schema.title = input.title
  }
  if (input.text) {
    schema.text = input.text
  }
  if (input.region) {
    schema.region = input.region
  }

  return schema
}

async function createTechnologyTransferNetworkSchema(input, ctx: Context) {
  let schema: TechnologyTransferNetworkCreateInput = <
    TechnologyTransferNetworkCreateInput
  >{}

  schema = await setNonTranslatedSchema(schema, input, ctx)

  return schema
}

async function updateTechnologyTransferNetworkSchema(input, id, ctx: Context) {
  let schema: TechnologyTransferNetworkUpdateInput = <
    TechnologyTransferNetworkUpdateInput
  >{}

  schema = await setNonTranslatedSchema(schema, input, ctx, id)

  return schema
}

export const technologyTransferNetwork = {
  async createTechnologyTransferNetwork(parent, args, ctx: Context) {
    const input = args.input

    return await ctx.prisma.createTechnologyTransferNetwork({
      ...(await createTechnologyTransferNetworkSchema(input, ctx)),
    })
  },

  async updateTechnologyTransferNetwork(parent, args, ctx: Context) {
    const { input, id } = args

    const technologyTransferNetwork = await ctx.prisma.technologyTransferNetwork(
      { id }
    )

    if (!technologyTransferNetwork) {
      throw new Error('TechnologyTransferNetwork not found!')
    }

    return await ctx.prisma.updateTechnologyTransferNetwork({
      data: {
        ...(await updateTechnologyTransferNetworkSchema(input, id, ctx)),
      },
      where: { id },
    })
  },

  async deleteTechnologyTransferNetwork(parent, { id }, ctx: Context) {
    const user = await getUser(ctx)

    if (!user) {
      throw new Error('User not authenticated')
    }

    return ctx.prisma.deleteTechnologyTransferNetwork({
      id,
    })
  },
}
