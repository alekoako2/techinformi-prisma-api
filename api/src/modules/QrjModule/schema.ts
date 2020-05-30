import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countQrjs: Int
    qrjs(query: String, first: Int, skip: Int): [Qrj!]!
    qrj(id: ID): Qrj!
  }

  extend type Mutation {
    createQrj(input: QrjInput): Qrj
    updateQrj(id: ID!, input: QrjInput): Qrj
    deleteQrj(id: ID): Qrj
  }

  extend type User {
    qrjs(language: LanguageCode!): [Qrj!]!
  }

  type Qrj {
    id: ID!
    year: String
    journal: [Journal]
    author: User!
  }

  type Journal {
    id: ID
    pubNumber: String
    translation(language: LanguageCode): [QrjTranslation]
  }

  type QrjTranslation {
    address: String
    language: Language!
  }

  input QrjInput {
    year: String
    journal: [JournalInput]
  }

  input JournalInput {
    id: ID
    pub_num: String
    translation: [QrjTranslationInput!]
  }

  input QrjTranslationInput {
    address: String
    language: LanguageCode
  }
`
