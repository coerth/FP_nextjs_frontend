import { handleAuth, handleCallback, getSession } from '@auth0/nextjs-auth0';
import { GraphQLClient, gql } from 'graphql-request';
import { NextResponse } from 'next/server';

const graphqlEndpoint = process.env.GRAPHQL_URL;

export default handleAuth({
  async callback(req, res) {
    try {
      // Handle the callback to exchange the authorization code for tokens
      await handleCallback(req, res, {
        redirectTo: '/',
      });

      // Retrieve the user session
      const session = getSession(req, res);
      if (!session || !session.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      // Call the user service to handle the user callback logic
      await handleUserCallback(req, res, graphqlEndpoint);

      // Redirect to the main page or any other desired page
      return NextResponse.redirect(new URL('/', req.url));
    } catch (error) {
      console.error('Error during callback handling:', error);
      res.status(error.status || 500).end(error.message);
    }
  },
});