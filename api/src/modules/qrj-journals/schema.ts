import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countQrjJournals(query: QrjJournalQueryInput): Int
    qrjJournals(
      query: QrjJournalQueryInput
      first: Int
      skip: Int
      orderBy: String
    ): [QrjJournal!]!
    qrjJournal(id: ID): QrjJournal!
  }

  extend type Mutation {
    createQrjJournal(input: QrjJournalCreateInput): QrjJournal
    updateQrjJournal(input: QrjJournalUpdateInput): QrjJournal
    deleteQrjJournal(id: ID): QrjJournal
  }

  input QrjJournalQueryInput {
    code: String
    name: String
  }

  extend type User {
    qrjJournals(language: LanguageCode!): [QrjJournal!]!
  }

  type QrjJournal {
    id: ID!
    code: String
    translation(language: LanguageCode): [QrjJournalTranslation!]!
  }

  type QrjJournalTranslation {
    id: ID
    name: String
    address: String
    language: Language
  }

  input QrjJournalCreateInput {
    code: String
    translation: [QrjJournalTranslationInput!]
  }

  input QrjJournalUpdateInput {
    id: ID!
    code: String
    translation: [QrjJournalTranslationInput!]
  }

  input QrjJournalTranslationInput {
    id: ID
    name: String
    address: String
    language: LanguageCode
  }
`
