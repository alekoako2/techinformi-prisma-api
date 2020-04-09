import {Context} from "../../../utils/utils";

export const User = {
    oecds: ({id}, args, ctx: Context) => {
        return ctx.prisma.user({id}).oecds()
    },
}
