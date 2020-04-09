import { Context, getUser, getUserId } from "../../../../utils/utils";

async function setSchema(schema, input, ctx = null, id = null, action = "create") {
  if (input.index) {
    schema.index = input.index;
  }
  if (input.year) {
    schema.year = input.year;
  }
  if (input.number) {
    schema.number = input.number;
  }
  if (input.pages) {
    schema.pages = input.pages;
  }
  if (input.inputDate) {
    schema.inputDate = input.inputDate;
  }
  if (input.journal) {
    schema.journal = { connect: { code: input.journal } };
  }
  if (input.oecd) {
    schema.oecd = { connect: { code: input.oecd } };
  }
  if (input.translation) {

    if (action === "create")
      schema.translation = createQrjPublicationSchema(input);
    else
      schema.translation = await updateQrjPublicationSchema(ctx, id, input);
  }
  
  schema.edited = true;

  return schema;
}

function createQrjPublicationSchema(input) {
  let create: any = [];

  for (let i = 0; i < input.translation.length; i++) {
    let translation: any = {};

    if (input.translation[i].language) {
      translation.language = { connect: { code: input.translation[i].language } };
    }
    if (input.translation[i].title) {
      translation.title = input.translation[i].title;
    }
    if (input.translation[i].publicationAuthor) {
      translation.publicationAuthor = input.translation[i].publicationAuthor;
    }
    if (input.translation[i].publicationLang) {
      translation.publicationLang = input.translation[i].publicationLang;
    }
    if (input.translation[i].abstract) {
      translation.abstract = input.translation[i].abstract;
    }
    create[i] = { ...translation };

  }
  return { create };

}

async function updateQrjPublicationSchema(ctx, id, input) {
  let update: any = [];

  for (let i = 0; i < input.translation.length; i++) {
    let data: any = {};

    let translation = await ctx.prisma.qrjPublication({ id }).translation({ where: { language: { code: input.translation[i].language } } });

    if (input.translation[i].title) {
      data.title = input.translation[i].title;
    }
    if (input.translation[i].publicationAuthor) {
      data.publicationAuthor = input.translation[i].publicationAuthor;
    }
    if (input.translation[i].publicationLang) {
      data.publicationLang = input.translation[i].publicationLang;
    }

    if (input.translation[i].abstract) {
      data.abstract = input.translation[i].abstract;
    }

    update[i] = { data, where: { id: translation[0].id } };

  }
  return { update };
}

export const qrjPublications = {

  async createQrjPublication(parent, args, ctx: Context) {

    const input = args.input;

    let schema: any = {};

    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    schema.author = {
      connect: {
        email: user.email
      }
    };

    schema = await setSchema(schema, input);
    return ctx.prisma.createQrjPublication({
      ...schema
    });

  },

  async updateQrjPublication(parent, args, ctx: Context) {

    const { input, id } = args;

    const qrjPublication = await ctx.prisma.qrjPublication({ id });

    if (!qrjPublication) {
      throw new Error("QrjPublication Publication not found!");
    }

    let schema: any = { data: {}, where: { id } };

    const user = await getUser(ctx);

    if (user) {
      qrjPublication.author = {
        connect: {
          email: user.email
        }
      };
    }

    schema.data = await setSchema(schema.data, input, ctx, id, "update");

    return ctx.prisma.updateQrjPublication({
      ...schema
    });

  },

  async deleteQrjPublication(parent, { id }, ctx: Context) {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }


    return ctx.prisma.deleteQrjPublication({
      id
    });
  }
};
