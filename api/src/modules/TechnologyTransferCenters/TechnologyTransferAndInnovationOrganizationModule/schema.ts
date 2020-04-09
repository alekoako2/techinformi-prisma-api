import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        countTechnologyTransferAndInnovationOrganizations:Int
        technologyTransferAndInnovationOrganizations(query:String, first:Int, skip:Int):[TechnologyTransferAndInnovationOrganization!]!
        technologyTransferAndInnovationOrganization(id:String):TechnologyTransferAndInnovationOrganization!
    }

    extend type Mutation {
        createTechnologyTransferAndInnovationOrganization(input: TechnologyTransferAndInnovationOrganizationInput):TechnologyTransferAndInnovationOrganization
        updateTechnologyTransferAndInnovationOrganization(id:ID!, input: TechnologyTransferAndInnovationOrganizationInput):TechnologyTransferAndInnovationOrganization
        deleteTechnologyTransferAndInnovationOrganization(id:ID):TechnologyTransferAndInnovationOrganization
    }

    extend type User {
        technologyTransferAndInnovationOrganizations(language:LanguageCode!):[TechnologyTransferAndInnovationOrganization!]!
    }

    type TechnologyTransferAndInnovationOrganization{
        id: ID!
        url: String
        title: String
        text: String
        region: String
        author:User!
    }

    input TechnologyTransferAndInnovationOrganizationInput{
        url: String
        title: String
        text: String
        region: String
    }

`;
