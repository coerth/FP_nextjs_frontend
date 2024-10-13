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

      const { user, accessToken } = session;
      console.log('User object:', user); // Log the user object for debugging
      console.log('Access Token:', accessToken); // Log the access token for debugging

      const graphQLClient = new GraphQLClient(graphqlEndpoint, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      // Check if the user exists in the database
      const query = gql`
        query GetUser($email: String!) {
          user(email: $email) {
            id
            email
          }
        }
      `;

      const variables = { email: user.email };
      const data = await graphQLClient.request(query, variables);

      // If the user does not exist, create a new user
      if (!data.user) {
        const mutation = gql`
          mutation CreateUser($sub: String!, $email: String!, $name: String!) {
            createUser(sub: $sub, email: $email, name: $name) {
              id
              email
            }
          }
        `;

        const mutationVariables = {
          sub: user.sub,
          email: user.email,
          name: user.name,
        };

        await graphQLClient.request(mutation, mutationVariables);
      }

      // Redirect to the main page or any other desired page
      return NextResponse.redirect(new URL('/', req.url));
    } catch (error) {
      console.error('Error during callback handling:', error);
      res.status(error.status || 500).end(error.message);
    }
  },
});