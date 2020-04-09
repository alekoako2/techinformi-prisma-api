import { Context, getUser } from "../../../../../utils/utils";
import {
  TechnologyTransferAndInnovationOrganizationCreateInput,
  TechnologyTransferAndInnovationOrganizationUpdateInput
} from "../../../../../generated/prisma-client";
import { TechnologyTransferAndInnovationOrganization } from "../TechnologyTransferAndInnovationOrganization";

async function setNonTranslatedSchema(schema, input, ctx: Context, id?) {
  const user = await getUser(ctx);

  if (!user) {
    throw new Error("User not authenticated");
  }

  schema.author = {
    connect: {
      email: user.email
    }
  };

  if (input.url) {
    schema.url = input.url;
  }
  if (input.title) {
    schema.title = input.title;
  }
  if (input.text) {
    schema.text = input.text;
  }
  if (input.region) {
    schema.region = input.region;
  }

  return schema;
}

async function createTechnologyTransferAndInnovationOrganizationSchema(input, ctx: Context) {
  let schema: TechnologyTransferAndInnovationOrganizationCreateInput = <TechnologyTransferAndInnovationOrganizationCreateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  return schema;
}

async function updateTechnologyTransferAndInnovationOrganizationSchema(input, id, ctx: Context) {


  let schema: TechnologyTransferAndInnovationOrganizationUpdateInput = <TechnologyTransferAndInnovationOrganizationUpdateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx, id);

  return schema;
}

export const technologyTransferAndInnovationOrganization = {

  async createTechnologyTransferAndInnovationOrganization(parent, args, ctx: Context) {
    const input = args.input;

    return await ctx.prisma.createTechnologyTransferAndInnovationOrganization({
      ...(await createTechnologyTransferAndInnovationOrganizationSchema(input, ctx))
    });

  },

  async updateTechnologyTransferAndInnovationOrganization(parent, args, ctx: Context) {

    const { input, id } = args;

    const technologyTransferAndInnovationOrganization = await ctx.prisma.technologyTransferAndInnovationOrganization({ id });

    if (!technologyTransferAndInnovationOrganization) {
      throw new Error("TechnologyTransferAndInnovationOrganization not found!");
    }

    return await ctx.prisma.updateTechnologyTransferAndInnovationOrganization({
      data: {
        ...(await updateTechnologyTransferAndInnovationOrganizationSchema(input, id, ctx))
      },
      where: { id }
    });

  },

  async deleteTechnologyTransferAndInnovationOrganization(parent, { id }, ctx: Context) {

    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.deleteTechnologyTransferAndInnovationOrganization({
      id
    });
  }

};
