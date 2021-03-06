import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    countQrjPublications(query: QrjPublicationQueryInput): Int
    qrjPublications(
      query: QrjPublicationQueryInput
      first: Int
      skip: Int
      orderBy: String
    ): [QrjPublication!]!
    qrjPublication(id: ID): QrjPublication!
  }

  extend type Mutation {
    createQrjPublication(input: QrjPublicationCreateInput): QrjPublication
    updateQrjPublication(input: QrjPublicationUpdateInput): QrjPublication
    deleteQrjPublication(id: ID): QrjPublication
  }

  input QrjPublicationQueryInput {
    index: String
    translation: QrjPublicationTranslationInput
    qrjJournal: String
    oecd: String
    keywords: [String]
    yearStart: String
    yearEnd: String
  }

  extend type User {
    qrjPublications(language: LanguageCode!): [QrjPublication!]!
  }

  type QrjPublication {
    id: ID
    edited: Boolean
    index: String
    year: String
    number: String
    pages: String
    inputDate: String
    doiUrl: String
    qrjJournal: QrjJournal
    oecd: Oecd
    translation(language: LanguageCode): [QrjPublicationTranslation]
  }

  type QrjPublicationTranslation {
    id: ID
    title: String
    publicationAuthor: String
    publicationLang: String
    abstract: String
    language: Language
  }

  input QrjPublicationCreateInput {
    index: String!
    year: String
    edited: Boolean
    number: String
    pages: String
    doiUrl: String
    qrjJournal: String
    inputDate: String
    oecd: String
    translation: [QrjPublicationTranslationInput]
  }

  input QrjPublicationUpdateInput {
    id: ID!
    index: String!
    year: String
    edited: Boolean
    number: String
    pages: String
    doiUrl: String
    qrjJournal: String
    inputDate: String
    oecd: String
    translation: [QrjPublicationTranslationInput]
  }

  input QrjPublicationTranslationInput {
    id: ID
    title: String
    publicationAuthor: String
    publicationLang: String
    abstract: String
    language: LanguageCode
  }
`
