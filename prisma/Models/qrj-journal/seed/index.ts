export async function seedQrjJournals(db, _cliProgress) {
  console.log("Seeding QrjPublication Journals...");

  const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
  const data = require("./seed.json");
  const length = data.length;
  bar.start(length, 0);

  let count = 1;
  for (let i = 0; i < length; i++) {

    const {
      code,
      geo,
      eng,
      address_geo,
      address_eng
    } = data[i];

    let schema: any = {};

    schema.author = { connect: { email: "alekofaco@gmail.com" } };

    if (code) {
      schema.code = code;
    }

    schema.translation = { create: [{ language: { connect: { code: "KA" } } }, { language: { connect: { code: "EN" } } }] };

    if (geo) {
      schema.translation.create[0].name = geo;
    }

    if (address_geo) {
      schema.translation.create[0].address = address_geo;
    }

    if (eng) {
      schema.translation.create[1].name = eng;
    }

    if (address_eng) {
      schema.translation.create[1].address = address_eng;
    }

    await db.createQrjJournal({
        ...schema
      }
    );

    bar.update(count++);

  }

  bar.stop();
  return "QrjPublication Journals Completed";
}
