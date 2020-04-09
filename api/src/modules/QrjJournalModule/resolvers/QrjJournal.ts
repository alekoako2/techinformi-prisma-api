import {Context} from "../../../utils/utils";

export const QrjJournal = {
    translation: ({id}, args, ctx: Context) => {
        return ctx.prisma.qrjJournal({id}).translation({where: {language: {code: args.language}}})
    },
    author: ({id}, args, ctx: Context) => {
        return ctx.prisma.qrjJournal({id}).author()
    },
}
