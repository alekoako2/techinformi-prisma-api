import { Context, getUser } from "../../../../utils/utils";
import {
  JournalCreateInput,
  JournalCreateManyInput,
  JournalUpdateDataInput,
  JournalUpdateManyInput,
  JournalUpdateWithWhereUniqueNestedInput,
  JournalWhereUniqueInput,
  LanguageCreateOneInput,
  ExpertCreateInput,
  ExpertTranslationCreateInput,
  ExpertTranslationCreateManyInput,
  ExpertTranslationUpdateDataInput,
  ExpertTranslationUpdateInput,
  ExpertTranslationUpdateManyInput,
  ExpertTranslationUpdateWithWhereUniqueNestedInput,
  ExpertTranslationWhereUniqueInput,
  ExpertUpdateInput,
  OecdCreateManyInput,
  OecdWhereUniqueInput,
  LanguageCreateManyInput,
  LanguageWhereUniqueInput,
  OecdUpdateManyInput, LanguageUpdateManyInput
} from "../../../../generated/prisma-client";

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

  if (input.inpDate) {
    schema.inpDate = input.inpDate;
  }
  if (input.email) {
    schema.email = input.email;
  }
  if (input.web) {
    schema.web = input.web;
  }
  if (input.tel) {
    schema.tel = input.tel;
  }
  if (input.mobile) {
    schema.mobile = input.mobile;
  }
  if (input.publications) {
    schema.publications = input.publications;
  }

  return schema;
}

async function createExpertSchema(input, ctx: Context) {
  let schema: ExpertCreateInput = <ExpertCreateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  schema.translation = <ExpertTranslationCreateManyInput>{};
  schema.translation.create = <ExpertTranslationCreateInput[]>[];

  if (input.translation) {

    for (let i = 0; i < input.translation.length; i++) {

      schema.translation.create[i] = <ExpertTranslationCreateInput>{};

      if (input.translation[i].fullName) {
        schema.translation.create[i].fullName = input.translation[i].fullName;
      }
      if (input.translation[i].qualification) {
        schema.translation.create[i].qualification = input.translation[i].qualification;
      }
      if (input.translation[i].academicDegree) {
        schema.translation.create[i].academicDegree = input.translation[i].academicDegree;
      }
      if (input.translation[i].specialization) {
        schema.translation.create[i].specialization = input.translation[i].specialization;
      }
      if (input.translation[i].workingPlace) {
        schema.translation.create[i].workingPlace = input.translation[i].workingPlace;
      }
      if (input.translation[i].position) {
        schema.translation.create[i].position = input.translation[i].position;
      }
      if (input.translation[i].language) {
        schema.translation.create[i].language = <LanguageCreateOneInput>{};
        schema.translation.create[i].language.connect = <LanguageWhereUniqueInput>{};
        schema.translation.create[i].language.connect.code = input.translation[i].language;
      }

    }

  }

  if (input.oecds) {
    schema.oecds = <OecdCreateManyInput>{};
    schema.oecds.connect = <OecdWhereUniqueInput[]>[];
    for (let i = 0; i < input.oecds.length; i++) {
      schema.oecds.connect[i] = <OecdWhereUniqueInput>{};
      schema.oecds.connect[i].code = input.oecds[i].code;
    }
  }

  if (input.languages) {
    schema.languages = <LanguageCreateManyInput>{};
    schema.languages.connect = <LanguageWhereUniqueInput[]>[];
    for (let i = 0; i < input.languages.length; i++) {
      schema.languages.connect[i] = <LanguageWhereUniqueInput>{};
      schema.languages.connect[i].code = input.languages[i].code;
    }
  }

  return schema;
}

async function updateExpertSchema(input, id, ctx: Context) {

  let schema: ExpertUpdateInput = <ExpertUpdateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx, id);

  schema.translation = <ExpertTranslationCreateManyInput>{};
  schema.translation.update = <ExpertTranslationUpdateWithWhereUniqueNestedInput[]>[];

  if (input.translation) {

    for (let i = 0; i < input.translation.length; i++) {

      schema.translation.update[i] = <ExpertTranslationUpdateWithWhereUniqueNestedInput>{};
      schema.translation.update[i].data = <ExpertTranslationUpdateDataInput>{};
      schema.translation.update[i].where = <ExpertTranslationWhereUniqueInput>{};

      let translation = await ctx.prisma.expert({ id }).translation({ where: { language: { code: input.translation[i].language } } });

      if (input.translation[i].fullName) {
        schema.translation.update[i].data.fullName = input.translation[i].fullName;
      }
      if (input.translation[i].qualification) {
        schema.translation.update[i].data.qualification = input.translation[i].qualification;
      }
      if (input.translation[i].academicDegree) {
        schema.translation.update[i].data.academicDegree = input.translation[i].academicDegree;
      }
      if (input.translation[i].specialization) {
        schema.translation.update[i].data.specialization = input.translation[i].specialization;
      }
      if (input.translation[i].workingPlace) {
        schema.translation.update[i].data.workingPlace = input.translation[i].workingPlace;
      }
      if (input.translation[i].position) {
        schema.translation.update[i].data.position = input.translation[i].position;
      }
      if (input.translation[i].language) {
        schema.translation.update[i].data.language = <LanguageCreateOneInput>{};
        schema.translation.update[i].data.language.connect = <LanguageWhereUniqueInput>{};
        schema.translation.update[i].data.language.connect.code = input.translation[i].language;
      }

      schema.translation.update[i].where.id = translation[0].id;

    }

  }

  if (input.oecds) {
    schema.oecds = <OecdUpdateManyInput>{};
    schema.oecds.set = <OecdWhereUniqueInput[]>[];
    for (let i = 0; i < input.oecds.length; i++) {
      schema.oecds.set[i] = <OecdWhereUniqueInput>{};
      schema.oecds.set[i].code = input.oecds[i].code;
    }
  }

  if (input.languages) {
    schema.languages = <LanguageUpdateManyInput>{};
    schema.languages.set = <LanguageWhereUniqueInput[]>[];
    for (let i = 0; i < input.languages.length; i++) {
      schema.languages.set[i] = <LanguageWhereUniqueInput>{};
      schema.languages.set[i].code = input.languages[i].code;
    }
  }

  return schema;
}

export const expert = {

  async createExpert(parent, args, ctx: Context) {
    const input = args.input;

    return await ctx.prisma.createExpert({
      ...(await createExpertSchema(input, ctx))
    });

  },

  async updateExpert(parent, args, ctx: Context) {

    const { input, id } = args;

    const expert = await ctx.prisma.expert({ id });

    if (!expert) {
      throw new Error("Expert not found!");
    }

    return await ctx.prisma.updateExpert({
      data: {
        ...(await updateExpertSchema(input, id, ctx))
      },
      where: { id }
    });

  },

  async deleteExpert(parent, { id }, ctx: Context) {

    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.deleteExpert({
      id
    });
  }

};
