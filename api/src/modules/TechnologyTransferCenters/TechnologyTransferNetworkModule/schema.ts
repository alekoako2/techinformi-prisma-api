import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        countTechnologyTransferNetworks:Int
        technologyTransferNetworks(query:String, first:Int, skip:Int):[TechnologyTransferNetwork!]!
        technologyTransferNetwork(id:String):TechnologyTransferNetwork!
    }

    extend type Mutation {
        createTechnologyTransferNetwork(input: TechnologyTransferNetworkInput):TechnologyTransferNetwork
        updateTechnologyTransferNetwork(id:ID!, input: TechnologyTransferNetworkInput):TechnologyTransferNetwork
        deleteTechnologyTransferNetwork(id:ID):TechnologyTransferNetwork
    }

    extend type User {
        technologyTransferNetworks(language:LanguageCode!):[TechnologyTransferNetwork!]!
    }

    type TechnologyTransferNetwork{
        id: ID!
        url: String
        title: String
        text: String
        region: String
        author:User!
    }

    input TechnologyTransferNetworkInput{
        url: String
        title: String
        text: String
        region: String
    }

`;
