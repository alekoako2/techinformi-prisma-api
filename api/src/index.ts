import { prisma } from './libs/interfaces/prisma/generated/prisma-client'
import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'

import { modules } from './modules'

import express from 'express'

const server = new ApolloServer({
  schema: buildFederatedSchema(modules),
  introspection: true,
  context: request => ({
    ...request,
    prisma,
  }),
})

const app = express()

server.applyMiddleware({
  app,
  cors: true,
  path: '/graphql',
})

app.listen({ port: 4001 }, () =>
  console.log(
    `🚀 Apollo-Prisma Server ready at http://localhost:4001${server.graphqlPath}`
  )
)
