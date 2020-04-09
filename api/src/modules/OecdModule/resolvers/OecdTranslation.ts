import {Context} from "../../../utils/utils";

export const OecdTranslation = {
    language: ({id}, args, ctx: Context) => {
        return ctx.prisma.oecdTranslation({id}).language()
    },
}
