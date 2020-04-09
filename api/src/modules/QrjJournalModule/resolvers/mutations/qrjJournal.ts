import { Context, getUser } from "../../../../utils/utils";
import {
  LanguageCreateOneInput,
  OecdCreateInput,
  OecdTranslationCreateInput,
  OecdTranslationCreateManyInput,
  OecdTranslationUpdateDataInput,
  OecdTranslationUpdateManyInput,
  OecdTranslationUpdateWithWhereUniqueNestedInput,
  OecdTranslationWhereUniqueInput,
  OecdUpdateInput,
  QrjJournalCreateInput,
  QrjJournalTranslationCreateInput,
  QrjJournalTranslationCreateManyInput, QrjJournalTranslationUpdateDataInput,
  QrjJournalTranslationUpdateManyInput,
  QrjJournalTranslationUpdateWithWhereUniqueNestedInput, QrjJournalTranslationWhereUniqueInput,
  QrjJournalUpdateInput
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

async function createQrjJournalSchema(input, ctx: Context) {
  let schema: QrjJournalCreateInput = <QrjJournalCreateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  schema.translation = <QrjJournalTranslationCreateManyInput>{};
  schema.translation.create = <QrjJournalTranslationCreateInput[]>[];

  for (let i = 0; i < input.translation.length; i++) {
    schema.translation.create[i] = <QrjJournalTranslationCreateInput>{};
    schema.translation.create[i].language = <LanguageCreateOneInput>{};
    if (input.translation[i].language) {
      schema.translation.create[i].language = { connect: { code: input.translation[i].language } };
    }
    if (input.translation[i].name) {
      schema.translation.create[i].name = input.translation[i].name;
    }
    if (input.translation[i].address) {
      schema.translation.create[i].address = input.translation[i].address;
    }
  }
  return schema;
}

async function updateQrjJournalSchema(input, id, ctx: Context) {

  let schema: QrjJournalUpdateInput = <QrjJournalUpdateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  schema.translation = <QrjJournalTranslationUpdateManyInput>{};
  schema.translation.update = <QrjJournalTranslationUpdateWithWhereUniqueNestedInput[]>[];

  if (input.translation) {
    for (let i = 0; i < input.translation.length; i++) {
      schema.translation.update[i] = <QrjJournalTranslationUpdateWithWhereUniqueNestedInput>{};
      schema.translation.update[i].where = <QrjJournalTranslationWhereUniqueInput>{};
      schema.translation.update[i].data = <QrjJournalTranslationUpdateDataInput>{};

      let translation = await ctx.prisma.qrjJournal({ id }).translation({ where: { language: { code: input.translation[i].language } } });

      if (input.translation[i].name) {
        schema.translation.update[i].data.name = input.translation[i].name;
      }
      if (input.translation[i].address) {
        schema.translation.update[i].data.address = input.translation[i].address;
      }

      schema.translation.update[i].where.id = translation[0].id;

    }
  }
  return schema;
}

export const qrjJournal = {

  async createQrjJournal(parent, args, ctx: Context) {
    const input = args.input;

    return await ctx.prisma.createQrjJournal({
      ...(await createQrjJournalSchema(input, ctx))
    });

  },

  async updateQrjJournal(parent, args, ctx: Context) {

    const { input, id } = args;

    const qrjJournal = await ctx.prisma.qrjJournal({ id });

    if (!qrjJournal) {
      throw new Error("QrjJournal not found!");
    }

    return await ctx.prisma.updateQrjJournal({
      data: {
        ...(await updateQrjJournalSchema(input, id, ctx))
      },
      where: { id }
    });

  },

  async deleteQrjJournal(parent, { id }, ctx: Context) {

    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.deleteQrjJournal({
      id
    });
  }


};
