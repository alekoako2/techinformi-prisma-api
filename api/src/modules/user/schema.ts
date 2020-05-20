import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    me(language: LanguageCode): User
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthPayload!
    signIn(input: SignInInput!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    role: Role!
    translation: [UserTranslationInput!]
  }

  input UserTranslationInput {
    firstName: String!
    lastName: String!
    language: LanguageCode!
  }

  type User {
    id: ID!
    email: String!
    role: Role!
    createdAt: String!
    translation(language: LanguageCode): [UserTranslation!]
  }

  type UserTranslation {
    firstName: String
    lastName: String
    language: Language!
  }

  enum Role {
    ADMIN
    EDITOR
    CUSTOMER
  }
`
