import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        countNewses:Int
        newses(query:String, first:Int, skip:Int):[News!]!
        news(id:String):News!
    }

    extend type Mutation {
        createNews(input: NewsInput):News
        updateNews(id:ID!, input: NewsInput):News
        deleteNews(id:ID):News
    }

    extend type User {
        newses(language:LanguageCode!):[News!]!
    }

    type News{
        id: ID!
        translation(language:LanguageCode): [NewsTranslation]
        author:User!
    }


    type NewsTranslation{
        title: String
        description: String
        content: String
        language:Language!
    }

    input NewsInput{
        translation:[NewsTranslationInput]
    }

    input NewsTranslationInput{
        title: String
        description: String
        content: String
        language: LanguageCode
    }
`;
