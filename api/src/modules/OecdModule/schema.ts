import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        countOecds:Int
        oecds(query:String, first:Int, skip:Int):[Oecd!]!
        oecd(id:String):Oecd!
    }

    extend type Mutation {
        createOecd(input: OecdInput):Oecd
        updateOecd(id:ID!, input: OecdInput):Oecd
        deleteOecd(id:ID):Oecd
    }

    extend type User {
        oecds(language:LanguageCode!):[Oecd!]!
    }

    type Oecd{
        id: ID!
        code: String
        translation(language:LanguageCode): [OecdTranslation]
        author:User!
    }

    type OecdTranslation{
        name:String
        language:Language!
    }

    input OecdInput{
        code: String
        translation:[OecdTranslationInput!]
    }

    input OecdTranslationInput{
        name: String
        language: LanguageCode
    }

`;
