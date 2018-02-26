import { GraphQLServer } from 'graphql-yoga'

const CORS = require('micro-cors')({ allowHeaders: ['X-Requested-With', 'Access-Control-Allow-Origin', 'X-HTTP-Method-Override', 'Content-Type', 'Authorization', 'Accept'] })
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://us1.prisma.sh/phil-bridges-45e182/zeit/dev",
      secret: "mysecret123",
      debug: true,
    }),
  }),
})

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

CORS(server.start(options, ({ port }) => console.log(`Server is running on ${port}`)))