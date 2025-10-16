import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/type-defs.js';
import { OpenMeteoClient } from './clients/open-meteo-client.js';
import { SuggestionsService } from './services/suggestions-service.js';
import { createResolvers } from './resolvers/suggestions-resolver.js';

const openMeteoClient = new OpenMeteoClient();
const suggestionsService = new SuggestionsService(openMeteoClient);

const resolvers = createResolvers(suggestionsService);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
