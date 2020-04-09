import { Context, getUser } from "../../../../utils/utils";
import {
  JournalCreateInput,
  JournalCreateManyInput,
  JournalUpdateDataInput,
  JournalUpdateManyInput,
  JournalUpdateWithWhereUniqueNestedInput,
  JournalWhereUniqueInput,
  LanguageCreateOneInput,
  QrjCreateInput,
  QrjTranslationCreateInput,
  QrjTranslationCreateManyInput,
  QrjTranslationUpdateDataInput,
  QrjTranslationUpdateInput,
  QrjTranslationUpdateManyInput,
  QrjTranslationUpdateWithWhereUniqueNestedInput,
  QrjTranslationWhereUniqueInput,
  QrjUpdateInput
} from "../../../../generated/prisma-client";
import { Journal } from "../Journal";

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

  if (input.year) {
    schema.year = input.year;
  }

  return schema;
}

async function createQrjSchema(input, ctx: Context) {
  let schema: QrjCreateInput = <QrjCreateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  schema.journal = <JournalCreateManyInput>{};
  schema.journal.create = <JournalCreateInput[]>[];

  for (let j = 0; j < input.journal.length; j++) {

    schema.journal.create[j] = <JournalCreateInput>{};

    let journal = input.journal[j];

    schema.journal.create[j].pubNumber = journal.pub_num;

    if (journal.translation) {

      schema.journal.create[j].translation = <QrjTranslationCreateManyInput>{};
      schema.journal.create[j].translation.create = <QrjTranslationCreateInput[]>[];

      for (let i = 0; i < journal.translation.length; i++) {

        schema.journal.create[j].translation.create[i] = <QrjTranslationCreateInput>{};
        schema.journal.create[j].translation.create[i].language = <LanguageCreateOneInput>{};

        if (journal.translation[i].language) {
          schema.journal.create[j].translation.create[i].language = { connect: { code: journal.translation[i].language } };
        }
        if (journal.translation[i].address) {
          schema.journal.create[j].translation.create[i].address = journal.translation[i].address;
        }

      }

    }

  }

  return schema;
}

async function updateQrjSchema(input, id, ctx: Context) {


  let schema: QrjUpdateInput = <QrjUpdateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx, id);

  if (input.journal) {
    schema.journal = <JournalUpdateManyInput>{};
    schema.journal.update = <JournalUpdateWithWhereUniqueNestedInput[]>[];

    for (let i = 0; i < input.journal.length; i++) {
      schema.journal.update[i] = <JournalUpdateWithWhereUniqueNestedInput>{};
      schema.journal.update[i].where = <JournalWhereUniqueInput>{};
      schema.journal.update[i].data = <JournalUpdateDataInput>{};

      let journals = await ctx.prisma.qrj({ id }).journal();

      if (input.journal[i].pub_num) {
        schema.journal.update[i].data.pubNumber = input.journal[i].pub_num;
      }
      schema.journal.update[i].where.id = journals[i].id;
    }
  }

  for (let j = 0; j < input.journal.length; j++) {

    schema.journal.update[j].data.translation = <QrjTranslationUpdateManyInput>{};
    schema.journal.update[j].data.translation.update = <QrjTranslationUpdateWithWhereUniqueNestedInput[]>[];
    let journals = await ctx.prisma.qrj({ id }).journal();

    if (input.journal[j].translation) {
      for (let i = 0; i < input.journal[j].translation.length; i++) {
        schema.journal.update[j].data.translation.update[i] = <QrjTranslationUpdateWithWhereUniqueNestedInput>{};
        schema.journal.update[j].data.translation.update[i].where = <QrjTranslationWhereUniqueInput>{};
        schema.journal.update[j].data.translation.update[i].data = <QrjTranslationUpdateDataInput>{};

        let translation = await ctx.prisma.qrj({ id }).journal({ where: { id: input.journal[j].id } }).translation({ where: { language: { code: input.journal[j].translation[i].language } } });

        if (input.journal[j].translation[i].address) {
          schema.journal.update[j].data.translation.update[i].data.address = input.journal[j].translation[i].address;
        }
        schema.journal.update[j].data.translation.update[i].where.id = translation[j].translation[0].id;
      }
    }
  }
  return schema;
}

export const qrj = {

  async createQrj(parent, args, ctx: Context) {
    const input = args.input;

    return await ctx.prisma.createQrj({
      ...(await createQrjSchema(input, ctx))
    });

  },

  async updateQrj(parent, args, ctx: Context) {

    const { input, id } = args;

    const qrj = await ctx.prisma.qrj({ id });

    if (!qrj) {
      throw new Error("Qrj not found!");
    }

    return await ctx.prisma.updateQrj({
      data: {
        ...(await updateQrjSchema(input, id, ctx))
      },
      where: { id }
    });

  },

  async deleteQrj(parent, { id }, ctx: Context) {

    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.deleteQrj({
      id
    });
  }

};
