import {Context} from "../../../utils/utils";

export const QrjJournalTranslation = {
    language: ({id}, args, ctx: Context) => {
        return ctx.prisma.qrjJournalTranslation({id}).language()
    },
}
