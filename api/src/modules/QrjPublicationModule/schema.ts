import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        countQrjPublications(query:qrjPublicationQueryInput):Int
        qrjPublications(query:qrjPublicationQueryInput, first:Int, skip:Int):[QrjPublication!]!
        qrjPublication(id:String):QrjPublication!
    }

    input qrjPublicationQueryInput{
        index:String
        author:String
        title:String
        qrjJournal:String
        oecd:String
        keywords:[String]
        yearStart:String
        yearEnd:String
    }

    extend type Mutation {
        createQrjPublication(input: QrjPublicationInput):QrjPublication
        updateQrjPublication(id:ID!, input: QrjPublicationInput):QrjPublication
        deleteQrjPublication(id:ID):QrjPublication
    }

    extend type User {
        qrjPublications(language:LanguageCode!):[QrjPublication!]!
    }

    type QrjPublication{
        id: ID!
        edited:Boolean
        index:String
        year:String
        number:String
        pages:String
        journal:QrjJournal
        inputDate:String
        oecd:Oecd
        translation(language:LanguageCode): [QrjPublicationTranslation]
        author:User!
    }

    type QrjPublicationTranslation{
        title: String
        publicationAuthor: String
        publicationLang: String
        abstract: String
        language:Language!
    }

    input QrjPublicationInput{
        index:String
        year:String
        edited:Boolean
        number:String
        pages:String
        journal:String
        inputDate:String
        oecd:String
        translation:[QrjPublicationTranslationInput]
    }

    input QrjPublicationTranslationInput{
        title: String
        publicationAuthor: String
        publicationLang: String
        abstract: String
        language: LanguageCode
    }

`;
