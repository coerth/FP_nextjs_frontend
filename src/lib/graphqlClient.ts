import { GraphQLClient } from 'graphql-request';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.GRAPHQL_URL || 'http://localhost:4000/graphql';

export const graphqlClient = new GraphQLClient(API_URL);

export function setAuthToken(token: string) {
  graphqlClient.setHeader('Authorization', `Bearer ${token}`);
}