import { QrjCreateInput } from "../../../../src/generated/prisma-client";

export async function seedQrj(db, _cliProgress) {
  console.log("Seeding Qrj...");

  const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
  const data = require("./seed.json");
  const length = data.length;
  bar.start(length, 0);

  let count = 1;
  for (let i = 0; i < length; i++) {

    const { year, pub_num, address_ka, address_eng } = data[i];

    let schema: QrjCreateInput = <QrjCreateInput>{};
    schema.author = { connect: { email: "alekofaco@gmail.com" } };

    if (year) {
      schema.year = year;
    }


    schema.journal = {
      create: []
    };

    for (let i = 0; i < pub_num.length; i++) {
      schema.journal.create[i] = {
        pubNumber: pub_num[i],
        translation: {
          create: [
            {
              address: address_ka[i],
              language: {
                connect: {
                  code: "KA"
                }
              }
            },
            {
              address: address_eng[i],
              language: {
                connect: {
                  code: "EN"
                }
              }
            }]
        }
      };
    }

    await db.createQrj({
        ...schema
      }
    );

    bar.update(count++);

  }

  bar.stop();
  return "Qrj Completed";

}

