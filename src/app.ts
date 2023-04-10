require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import {ApolloServer} from '@apollo/server';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import {expressMiddleware} from '@apollo/server/express4';
import {errorHandler, notFound} from './middlewares';
import typeDefs from './api/schemas';
import resolvers from './api/resolvers';
import authorize from './functions/authorize';
import {AppContext} from './interfaces/AppContext';

const app = express();

(async () => {
  try {
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      })
    );

    const server = new ApolloServer<AppContext>({
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
      includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
    });
    await server.start();

    app.use(
      '/graphql',
      express.json(),
      cors<cors.CorsRequest>(),
      expressMiddleware(server, {
        context: async ({req}) => authorize(req),
      })
    );
    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.error(error);
  }
})();

export default app;
