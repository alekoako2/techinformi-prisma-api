import { prisma } from './libs/interfaces/prisma/generated/prisma-client'
import { ApolloServer } from 'apollo-server-express'
import { modules } from './modules'

const express = require('express')

const server = new ApolloServer({
  modules,
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

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
