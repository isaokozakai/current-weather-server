import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import resolvers from './resolvers';
// import { db } from './database';

// db();

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
