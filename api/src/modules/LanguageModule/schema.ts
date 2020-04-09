import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Language{
        code:LanguageCode
        name:String
    }

    input LanguageInput{
        code:String
    }
    
    enum LanguageCode{
        KA
        EN
        FR
        DE
        RU
        ES
        IT
    }

`;
