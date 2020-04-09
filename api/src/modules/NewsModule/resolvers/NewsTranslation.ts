import {Context} from "../../../utils/utils";

export const NewsTranslation = {
    language: ({id}, args, ctx: Context) => {
        return ctx.prisma.newsTranslation({id}).language()
    },
}
