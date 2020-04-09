import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        countQrjJournals:Int
        qrjJournals(query:String, first:Int, skip:Int):[QrjJournal!]!
        qrjJournal(id:String):QrjJournal!
    }

    extend type Mutation {
        createQrjJournal(input: QrjJournalInput):QrjJournal
        updateQrjJournal(id:ID!, input: QrjJournalInput):QrjJournal
        deleteQrjJournal(id:ID):QrjJournal
    }

    extend type User {
        qrjJournals(language:LanguageCode!):[QrjJournal!]!
    }

    type QrjJournal{
        id: ID!
        code: String
        translation(language:LanguageCode): [QrjJournalTranslation]
        author:User!
    }

    type QrjJournalTranslation{
        name: String
        address: String
        language:Language!
    }

    input QrjJournalInput{
        code: String
        translation: [QrjJournalTranslationInput!]
    }

    input QrjJournalTranslationInput{
        name: String
        address: String
        language: LanguageCode
    }

`;
