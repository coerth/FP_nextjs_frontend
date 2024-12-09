import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || ' ';

console.log('env', process.env.GRAPHQL_URL);

export const graphqlClient = new GraphQLClient(API_URL);

export function setAuthToken(token: string) {
  graphqlClient.setHeader('Authorization', `Bearer ${token}`);
}