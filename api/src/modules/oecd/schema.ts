import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countOecds(query: OecdsQueryInput): Int
    oecds(
      query: OecdsQueryInput
      first: Int
      skip: Int
      orderBy: String
    ): [Oecd!]!
    oecd(id: ID): Oecd!
  }

  extend type Mutation {
    createOecd(input: OecdInput): Oecd
    updateOecd(id: ID!, input: OecdInput): Oecd
    deleteOecd(id: ID): Oecd
  }

  input OecdsQueryInput {
    code: String
    name: String
  }

  extend type User {
    oecds(language: LanguageCode!): [Oecd!]!
  }

  type Oecd {
    id: ID!
    code: String
    translation(language: LanguageCode): [OecdTranslation!]!
  }

  type OecdTranslation {
    name: String!
  }

  input OecdInput {
    code: String
    translation: [OecdTranslationInput!]
  }

  input OecdTranslationInput {
    name: String
    language: LanguageCode
  }
`
