import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Query {
    homeSlides: [HomeSlide!]!
  }

  type HomeSlide {
    breakpoint: Int
    imageUrl: String
    url: String
  }

  type HomeSlideTranslation {
    title: String
    text: String
    language: Language
  }
`
