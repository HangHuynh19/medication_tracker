import express from 'express';
import helmet from 'helmet';
import {ApolloServer} from '@apollo/server';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import {expressMiddleware} from '@apollo/server/express4';
import authenticate from './functions/authenticate';
import {AppContext} from './interfaces/AppContext';
import {errorHandler, notFound} from './middlewares';
import typeDefs from './api/schemas';

const app = express();

(async () => {
  try {
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              embed: true as false,
            })
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      includeStacktraceInErrorResponses: true,
    });
    await server.start();

    app.use(
      '/graphql',
      express.json(),
      cors<cors.CorsRequest>()
      //expressMiddleware(server, {context: async ({req}) => authenticate(req)})
    );
    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.error(error);
  }
})();

export default app;
