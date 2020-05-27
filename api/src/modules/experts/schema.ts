import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countExperts(query: expertQueryInput): Int
    experts(
      query: expertQueryInput
      first: Int
      skip: Int
      orderBy: String
    ): [Expert!]!
    expert(id: String): Expert!
  }

  input expertQueryInput {
    translation: ExpertTranslationInput
    oecd: String
  }

  extend type Mutation {
    createExpert(input: ExpertInput): Expert
    updateExpert(id: ID!, input: ExpertInput): Expert
    deleteExpert(id: ID): Expert
  }

  extend type User {
    experts(language: LanguageCode!): [Expert!]!
  }

  type Expert {
    id: ID
    inpDate: String
    workExperience: String
    email: String
    web: String
    tel: String
    mobile: String
    publications: String
    translation(language: LanguageCode): [ExpertTranslation]
    oecds: [Oecd]
    languages: [Language]
    author: User
  }

  type ExpertTranslation {
    fullName: String
    qualification: String
    academicDegree: String
    specialization: String
    workingPlace: String
    position: String
    language: Language
  }

  input ExpertInput {
    inpDate: String
    email: String
    web: String
    workExperience: String
    tel: String
    mobile: String
    publications: String
    translation: [ExpertTranslationInput]
    oecds: [OecdInput]
    languages: [LanguageInput]
  }

  input ExpertTranslationInput {
    fullName: String
    qualification: String
    academicDegree: String
    specialization: String
    workingPlace: String
    position: String
    language: LanguageCode
  }
`
