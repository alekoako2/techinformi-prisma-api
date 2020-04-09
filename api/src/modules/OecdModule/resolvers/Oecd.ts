import {Context} from "../../../utils/utils";

export const Oecd = {
    translation: ({id}, args, ctx: Context) => {
        return ctx.prisma.oecd({id}).translation({where: {language: {code: args.language}}})
    },
    author: ({id}, args, ctx: Context) => {
        return ctx.prisma.oecd({id}).author()
    },
}
