import { Context, getUser } from "../../../../utils/utils";
import {
  LanguageCreateOneInput,
  OecdCreateInput,
  OecdTranslationCreateInput,
  OecdTranslationCreateManyInput, OecdTranslationUpdateDataInput,
  OecdTranslationUpdateInput,
  OecdTranslationUpdateManyInput,
  OecdTranslationUpdateWithWhereUniqueNestedInput, OecdTranslationWhereUniqueInput,
  OecdUpdateInput
} from "../../../../generated/prisma-client";

async function setNonTranslatedSchema(schema, input, ctx: Context) {
  const user = await getUser(ctx);

  if (!user) {
    throw new Error("User not authenticated");
  }

  schema.author = {
    connect: {
      email: user.email
    }
  };

  if (input.code) {
    schema.code = input.code;
  }

  return schema;
}

async function createOecdSchema(input, ctx: Context) {
  let schema: OecdCreateInput = <OecdCreateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  schema.translation = <OecdTranslationCreateManyInput>{};
  schema.translation.create = <OecdTranslationCreateInput[]>[];

  for (let i = 0; i < input.translation.length; i++) {
    schema.translation.create[i] = <OecdTranslationCreateInput>{};
    schema.translation.create[i].language = <LanguageCreateOneInput>{};
    if (input.translation[i].language) {
      schema.translation.create[i].language = { connect: { code: input.translation[i].language } };
    }
    if (input.translation[i].name) {
      schema.translation.create[i].name = input.translation[i].name;
    }
  }
  return schema;
}

async function updateOecdSchema(input, id, ctx: Context) {


  let schema: OecdUpdateInput = <OecdUpdateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  schema.translation = <OecdTranslationUpdateManyInput>{};
  schema.translation.update = <OecdTranslationUpdateWithWhereUniqueNestedInput[]>[];

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.update[i] = <OecdTranslationUpdateWithWhereUniqueNestedInput>{};
      schema.translation.update[i].where = <OecdTranslationWhereUniqueInput>{};
      schema.translation.update[i].data = <OecdTranslationUpdateDataInput>{};

      let translation = await ctx.prisma.oecd({ id }).translation({ where: { language: { code: input.translation[i].language } } });
      if (input.translation[i].name) {
        schema.translation.update[i].data.name = input.translation[i].name;
      }
      schema.translation.update[i].where.id = translation[0].id;
    }
  }
  return schema;
}

export const oecd = {

  async createOecd(parent, args, ctx: Context) {
    const input = args.input;

    return await ctx.prisma.createOecd({
      ...(await createOecdSchema(input, ctx))
    });

  },

  async updateOecd(parent, args, ctx: Context) {

    const { input, id } = args;

    const oecd = await ctx.prisma.oecd({ id });

    if (!oecd) {
      throw new Error("Oecd not found!");
    }

    return await ctx.prisma.updateOecd({
      data: {
        ...(await updateOecdSchema(input, id, ctx))
      },
      where: { id }
    });

  },

  async deleteOecd(parent, { id }, ctx: Context) {

    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.deleteOecd({
      id
    });
  }

};
