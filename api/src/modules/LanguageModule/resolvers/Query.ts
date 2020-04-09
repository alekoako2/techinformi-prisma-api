import {Context} from "../../../utils/utils";

export const resolvers = {
    Query: {
        news(parent, {language}, ctx: Context) {
            const where = {
                translation: {
                    // language: {
                    //     code: language
                    // }
                }
            };

            return ctx.prisma.newses({where})
        }
    }
}
