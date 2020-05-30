import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar Date
  extend type Query {
    researchProjects(
      query: ResearchProjectQueryInput
      first: Int
      skip: Int
    ): [ResearchProject!]!
    countResearchProjects(query: ResearchProjectQueryInput): Int
    researchProject(id: ID): ResearchProject!
  }
  input ResearchProjectQueryInput {
    principalExecutingOrganization: String
    yearResearchProgressStartOrEndYear: Date
    leaderExecutors: String
    keywords: String
    fromYear: Date
    title: String
    oecd: String
    toYear: Date
  }
  extend type Mutation {
    updateResearchProject(id: ID!, input: ResearchProjectInput): ResearchProject
    createResearchProject(input: ResearchProjectInput): ResearchProject
    deleteResearchProject(id: ID): ResearchProject
  }

  extend type User {
    researchProjects(language: LanguageCode!): [ResearchProject!]!
  }

  type ResearchProject {
    translation(language: LanguageCode): [ResearchProjectTranslation]
    participatingInstitutionCountryCity: String
    participatingInstitutionEmail: String
    participatingInstitutionName: String
    participatingInstitutionTel: String
    participatingInstitutionWeb: String
    researchExecutionBasis: String
    organizationShortName: String
    leaderAcademicDegree: String
    organizationAddress: String
    researchDirection: String
    organizationIndex: String
    researchExecutors: String
    organizationName: String
    organizationCode: String
    organizationHead: String
    organizationCity: String
    organizationTel: String
    organizationWeb: String
    leaderPosition: String
    leaderMobile: String
    leaderEmail: String
    annotation: String
    leaderName: String
    startDate: String
    leaderTel: String
    financing: String
    research: String
    abstract: String
    inpDate: String
    regDate: String
    endDate: String
    regNumb: String
    pincode: String
    oecds: [Oecd]
    note: String
    budget: Int
    author: User
    id: ID
  }

  type ResearchProjectTranslation {
    language: Language
    key: [Keyword]
    title: String
  }

  type Keyword {
    name: String
  }

  input ResearchProjectInput {
    researchExecutionBasis: String
    researchDirection: String
    startDate: String
    inpDate: String
    regDate: String
    endDate: String
    regNumb: String
    research: String
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

  input ResearchProjectTranslationInput {
    title: String
    key: [String]
    language: LanguageCode
  }
`
