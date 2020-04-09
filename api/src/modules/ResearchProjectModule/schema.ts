import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        countResearchProjects(query:ResearchProjectQueryInput):Int
        researchProjects(query:ResearchProjectQueryInput, first:Int, skip:Int):[ResearchProject!]!
        researchProject(id:String):ResearchProject!
    }
    input ResearchProjectQueryInput{
        title:String
        researchExecutors:String
        keyword:String
        organizationName:String
        oecd:String
    }
    extend type Mutation {
        createResearchProject(input: ResearchProjectInput):ResearchProject
        updateResearchProject(id:ID!, input: ResearchProjectInput):ResearchProject
        deleteResearchProject(id:ID):ResearchProject
    }

    extend type User {
        researchProjects(language:LanguageCode!):[ResearchProject!]!
    }

    type ResearchProject{
        id: ID
        inpDate: String
        regDate: String
        startDate: String
        endDate: String
        regNumb: String
        research: String
        researchDirection: String
        researchExecutionBasis: String
        abstract: String
        annotation: String
        budget: Int
        organizationName: String
        organizationShortName: String
        organizationCode: String
        organizationHead: String
        organizationCity: String
        organizationAddress: String
        organizationIndex: String
        organizationTel: String
        organizationWeb: String
        participatingInstitutionName: String
        participatingInstitutionCountryCity: String
        participatingInstitutionTel: String
        participatingInstitutionEmail: String
        participatingInstitutionWeb: String
        leaderName: String
        leaderPosition: String
        leaderAcademicDegree: String
        leaderTel: String
        leaderMobile: String
        leaderEmail: String
        researchExecutors: String
        financing: String
        note: String
        pincode: String
        translation(language:LanguageCode): [ResearchProjectTranslation]
        oecds: [Oecd]
        author:User!
    }


    type ResearchProjectTranslation{
        title: String
        key: [Keyword]
        language:Language!
    }

    type Keyword{
        name:String
    }

    input ResearchProjectInput{
        inpDate: String
        regDate: String
        startDate: String
        endDate: String
        regNumb: String
        research: String
        researchDirection: String
        researchExecutionBasis: String
        abstract: String
        annotation: String
        budget: Int
        organizationName: String
        organizationShortName: String
        organizationCode: String
        organizationHead: String
        organizationCity: String
        organizationAddress: String
        organizationIndex: String
        organizationTel: String
        organizationWeb: String
        participatingInstitutionName: String
        participatingInstitutionCountryCity: String
        participatingInstitutionTel: String
        participatingInstitutionEmail: String
        participatingInstitutionWeb: String
        leaderName: String
        leaderPosition: String
        leaderAcademicDegree: String
        leaderTel: String
        leaderMobile: String
        leaderEmail: String
        researchExecutors: String
        financing: String
        note: String
        pincode: String
        translation: [ResearchProjectTranslationInput]
        oecds: [OecdInput]
        languages: [LanguageInput]
    }


    input ResearchProjectTranslationInput{
        title: String
        key: [String]
        language: LanguageCode
    }

`;
