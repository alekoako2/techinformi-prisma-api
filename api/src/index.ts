import { prisma } from "./generated/prisma-client";

const express = require("express");
import { ApolloServer } from "apollo-server-express";
import { AppModule } from "./modules/AppModule";

const server = new ApolloServer({
  modules: [
    ...AppModule
  ],
  introspection: true,
  context: request => ({
    ...request,
    prisma
  })
});

const app = express();
server.applyMiddleware({
  app,
  cors: true,
  path: "/graphql"
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
