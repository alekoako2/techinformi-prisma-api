import {Context} from "../../../utils/utils";

export const UserTranslation = {
    language: ({id}, args, ctx: Context) => {

        return ctx.prisma.userTranslation({id}).language()
    },
}
