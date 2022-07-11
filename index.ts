import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import jwt from 'jsonwebtoken';
import { devTokenKey } from './constant';
import resolvers from './resolvers';

const schema = loadSchemaSync('./schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization?.replace('Bearer', '')?.trim() || '';

    if (token) {
      // try to retrieve a user with the token
      const tokenKey = process.env.TOKEN_KEY || devTokenKey;
      try {
        const user = jwt.verify(token, tokenKey);

        // add the user to the context
        return { user };
      } catch (error) {
        return {};
      }
    }

    return {};
  },
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
  console.log(`Server is up at ${url}`);
});
