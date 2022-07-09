import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
import resolvers from './resolvers';

const schema = loadSchemaSync('./schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
  console.log(`Server is up at ${url}`);
});
