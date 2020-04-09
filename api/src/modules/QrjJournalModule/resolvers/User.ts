import {Context} from "../../../utils/utils";

export const User = {
    qrjJournals: ({id}, args, ctx: Context) => {
        return ctx.prisma.user({id}).qrjJournals()
    },
}
