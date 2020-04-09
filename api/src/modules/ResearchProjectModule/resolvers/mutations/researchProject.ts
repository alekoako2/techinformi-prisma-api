import { Context, getUser } from "../../../../utils/utils";
import {
  LanguageCreateOneInput,
  ResearchProjectCreateInput,
  ResearchProjectTranslationCreateInput,
  ResearchProjectTranslationCreateManyInput,
  ResearchProjectTranslationUpdateDataInput,
  ResearchProjectTranslationUpdateWithWhereUniqueNestedInput,
  ResearchProjectTranslationWhereUniqueInput,
  ResearchProjectUpdateInput,
  OecdCreateManyInput,
  OecdWhereUniqueInput,
  LanguageWhereUniqueInput,
  OecdUpdateManyInput,
  KeywordCreateManyInput, KeywordCreateInput, KeywordUpdateManyInput
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
  if (input.regDate) {
    schema.regDate = input.regDate;
  }
  if (input.startDate) {
    schema.startDate = input.startDate;
  }
  if (input.endDate) {
    schema.endDate = input.endDate;
  }
  if (input.regNumb) {
    schema.regNumb = input.regNumb;
  }
  if (input.research) {
    schema.research = input.research;
  }
  if (input.researchDirection) {
    schema.researchDirection = input.researchDirection;
  }
  if (input.researchExecutionBasis) {
    schema.researchExecutionBasis = input.researchExecutionBasis;
  }
  if (input.abstract) {
    schema.abstract = input.abstract;
  }
  if (input.annotation) {
    schema.annotation = input.annotation;
  }
  if (input.budget) {
    console.log(input.budget);
    schema.budget = input.budget;
  }
  if (input.organizationName) {
    schema.organizationName = input.organizationName;
  }
  if (input.organizationShortName) {
    schema.organizationShortName = input.organizationShortName;
  }
  if (input.organizationCode) {
    schema.organizationCode = input.organizationCode;
  }
  if (input.organizationHead) {
    schema.organizationHead = input.organizationHead;
  }
  if (input.organizationCity) {
    schema.organizationCity = input.organizationCity;
  }
  if (input.organizationAddress) {
    schema.organizationAddress = input.organizationAddress;
  }
  if (input.organizationIndex) {
    schema.organizationIndex = input.organizationIndex;
  }
  if (input.organizationTel) {
    schema.organizationTel = input.organizationTel;
  }
  if (input.organizationWeb) {
    schema.organizationWeb = input.organizationWeb;
  }
  if (input.participatingInstitutionName) {
    schema.participatingInstitutionName = input.participatingInstitutionName;
  }
  if (input.participatingInstitutionCountryCity) {
    schema.participatingInstitutionCountryCity = input.participatingInstitutionCountryCity;
  }
  if (input.participatingInstitutionTel) {
    schema.participatingInstitutionTel = input.participatingInstitutionTel;
  }
  if (input.participatingInstitutionEmail) {
    schema.participatingInstitutionEmail = input.participatingInstitutionEmail;
  }
  if (input.participatingInstitutionWeb) {
    schema.participatingInstitutionWeb = input.participatingInstitutionWeb;
  }
  if (input.leaderName) {
    schema.leaderName = input.leaderName;
  }
  if (input.leaderPosition) {
    schema.leaderPosition = input.leaderPosition;
  }
  if (input.leaderAcademicDegree) {
    schema.leaderAcademicDegree = input.leaderAcademicDegree;
  }
  if (input.leaderTel) {
    schema.leaderTel = input.leaderTel;
  }
  if (input.leaderMobile) {
    schema.leaderMobile = input.leaderMobile;
  }
  if (input.leaderEmail) {
    schema.leaderEmail = input.leaderEmail;
  }
  if (input.researchExecutors) {
    schema.researchExecutors = input.researchExecutors;
  }
  if (input.financing) {
    schema.financing = input.financing;
  }
  if (input.note) {
    schema.note = input.note;
  }
  if (input.pincode) {
    schema.pincode = input.pincode;
  }

  return schema;
}

async function createResearchProjectSchema(input, ctx: Context) {
  let schema: ResearchProjectCreateInput = <ResearchProjectCreateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx);

  schema.translation = <ResearchProjectTranslationCreateManyInput>{};
  schema.translation.create = <ResearchProjectTranslationCreateInput[]>[];

  if (input.translation) {

    for (let i = 0; i < input.translation.length; i++) {

      schema.translation.create[i] = <ResearchProjectTranslationCreateInput>{};

      if (input.translation[i].title) {
        schema.translation.create[i].title = input.translation[i].title;
      }
      if (input.translation[i].key) {
        schema.translation.create[i].key = <KeywordCreateManyInput>{};
        schema.translation.create[i].key.create = <KeywordCreateInput[]>[];
        for (let k = 0; k < input.translation[i].key.length; k++) {
          schema.translation.create[i].key.create[k] = { name: input.translation[i].key[k] };
        }
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

  return schema;
}

async function updateResearchProjectSchema(input, id, ctx: Context) {

  let schema: ResearchProjectUpdateInput = <ResearchProjectUpdateInput>{};

  schema = await setNonTranslatedSchema(schema, input, ctx, id);

  schema.translation = <ResearchProjectTranslationCreateManyInput>{};
  schema.translation.update = <ResearchProjectTranslationUpdateWithWhereUniqueNestedInput[]>[];

  if (input.translation) {

    for (let i = 0; i < input.translation.length; i++) {

      schema.translation.update[i] = <ResearchProjectTranslationUpdateWithWhereUniqueNestedInput>{};
      schema.translation.update[i].data = <ResearchProjectTranslationUpdateDataInput>{};
      schema.translation.update[i].where = <ResearchProjectTranslationWhereUniqueInput>{};

      let translation = await ctx.prisma.researchProject({ id }).translation({ where: { language: { code: input.translation[i].language } } });
      if (input.translation[i].title) {
        schema.translation.update[i].data.title = input.translation[i].title;
      }
      if (input.translation[i].key) {
        schema.translation.update[i].data.key = <KeywordUpdateManyInput>{};
        schema.translation.update[i].data.key.set = input.translation[i].key;
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

  return schema;
}

export const researchProject = {

  async createResearchProject(parent, args, ctx: Context) {
    const input = args.input;

    return await ctx.prisma.createResearchProject({
      ...(await createResearchProjectSchema(input, ctx))
    });

  },

  async updateResearchProject(parent, args, ctx: Context) {

    const { input, id } = args;

    const researchProject = await ctx.prisma.researchProject({ id });

    if (!researchProject) {
      throw new Error("ResearchProject not found!");
    }

    return await ctx.prisma.updateResearchProject({
      data: {
        ...(await updateResearchProjectSchema(input, id, ctx))
      },
      where: { id }
    });

  },

  async deleteResearchProject(parent, { id }, ctx: Context) {

    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.deleteResearchProject({
      id
    });
  }

};
