import {Context} from "../../../utils/utils";

export const User = {
    translation: ({id}, args, ctx: Context) => {
        return ctx.prisma.user({id}).translation({where: {language: {code: args.language}}})
    },
}
