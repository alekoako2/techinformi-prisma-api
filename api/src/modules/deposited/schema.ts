import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countDepositeds(query: DepositedQueryInput): Int
    depositeds(
      query: DepositedQueryInput
      first: Int
      skip: Int
      orderBy: String
    ): [Deposited!]!
    deposited(id: ID): Deposited!
  }

  input DepositedQueryInput {
    index: String
    uak: String
    year: String
    translation: DepositedTranslationInput
    oecd: String
  }

  extend type Mutation {
    createDeposited(input: DepositedCreateInput): Deposited
    updateDeposited(input: DepositedUpdateInput): Deposited
    deleteDeposited(id: ID): Deposited
  }

  extend type User {
    depositeds(language: LanguageCode!): [Deposited!]!
  }

  type Deposited {
    id: ID
    index: String
    uak: String
    year: String
    oecd: Oecd
    translation(language: LanguageCode): [DepositedTranslation]
  }

  type DepositedTranslation {
    id: ID
    title: String
    author: String
    institute: String
    resume: String
    language: Language
  }

  input DepositedCreateInput {
    index: String!
    year: String
    uak: String
    oecd: String
    translation: [DepositedTranslationInput]
  }

  input DepositedUpdateInput {
    id: ID!
    index: String!
    year: String
    uak: String
    oecd: String
    translation: [DepositedTranslationInput]
  }

  input DepositedTranslationInput {
    id: ID
    title: String
    author: String
    institute: String
    resume: String
    language: LanguageCode
  }
`
