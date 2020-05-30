import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countQrjJournals(query: QrjJournalsQueryInput): Int
    qrjJournals(
      query: QrjJournalsQueryInput
      first: Int
      skip: Int
      orderBy: String
    ): [QrjJournal!]!
    qrjJournal(id: ID): QrjJournal!
  }

  extend type Mutation {
    createQrjJournal(input: QrjJournalInput): QrjJournal
    updateQrjJournal(id: ID!, input: QrjJournalInput): QrjJournal
    deleteQrjJournal(id: ID): QrjJournal
  }

  input QrjJournalsQueryInput {
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
    name: String
    address: String
    language: Language
  }

  input QrjJournalInput {
    code: String
    translation: [QrjJournalTranslationInput!]
  }

  input QrjJournalTranslationInput {
    name: String
    address: String
    language: LanguageCode
  }
`
