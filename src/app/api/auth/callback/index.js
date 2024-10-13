// pages/api/auth/callback/index.js
import { handleCallback } from '@auth0/nextjs-auth0';
import { GraphQLClient, gql } from 'graphql-request';
import { NextResponse } from 'next/server';

const graphqlEndpoint = process.env.GRAPHQL_URL;

console.log('GRAPHQL_URL:', graphqlEndpoint);

export default async function callback(req, res) {
  try {
    const { user } = await handleCallback(req, res);
    console.log('User object:', user); // Log the user object for debugging

    const graphQLClient = new GraphQLClient(graphqlEndpoint, {
      headers: {
        authorization: `Bearer ${req.cookies['auth0.is.authenticated']}`,
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
        mutation CreateUser($googleId: String!, $email: String!, $name: String!) {
          createUser(googleId: $googleId, email: $email, name: $name) {
            id
            email
          }
        }
      `;

      const mutationVariables = {
        googleId: user.sub,
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
}