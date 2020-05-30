import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countNewses(query: NewsQueryInput): Int
    newses(
      query: NewsQueryInput
      first: Int
      skip: Int
      orderBy: String
    ): [News!]!
    news(id: ID): News!
  }

  input NewsQueryInput {
    translation: NewsTranslationInput
  }

  extend type Mutation {
    createNews(input: NewsCreateInput): News
    updateNews(input: NewsUpdateInput): News
    deleteNews(id: ID): News
  }

  extend type User {
    newses(language: LanguageCode!): [News!]!
  }

  type News {
    id: ID
    translation(language: LanguageCode): [NewsTranslation]
  }

  type NewsTranslation {
    id: ID
    title: String
    description: String
    content: String
    language: Language
  }

  input NewsCreateInput {
    translation: [NewsTranslationInput]
  }

  input NewsUpdateInput {
    id: ID!
    translation: [NewsTranslationInput]
  }

  input NewsTranslationInput {
    title: String
    description: String
    content: String
    language: LanguageCode
  }
`
