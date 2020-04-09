import {Query} from "./Query";
import {QrjJournal} from "./QrjJournal";
import {QrjJournalTranslation} from "./QrjJournalTranslation";
import {qrjJournal} from "./mutations/qrjJournal";
import {User} from "./User";

export const resolvers = {
    Query,
    QrjJournal,
    QrjJournalTranslation,
    Mutation: {
        ...qrjJournal
    },
    User
};
