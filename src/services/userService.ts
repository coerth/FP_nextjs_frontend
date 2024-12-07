import { graphqlClient, setAuthToken } from '@/lib/graphqlClient';
import { User } from '@/types/User';
import { fetchJWTToken } from '@/utils/fetchJWTToken';

const UPDATE_USER_MUTATION = `
  mutation UpdateUser($name: String!, $nickname: String!) {
    updateUser(name: $name, nickname: $nickname) {
      id
      name
      nickname
      email
    }
  }
`;

const FETCH_USER_QUERY = `
  query User {
  user {
    id
    email
    name
    nickname
  }
}
`;

export async function updateUser({name, nickname}: {name: string, nickname: string}): Promise<{ id: string; name: string; nickname: string }> {

    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);
    const variables = { name, nickname };
    const data = await graphqlClient.request<{ updateUser: { id: string; name: string; nickname: string } }>(
    UPDATE_USER_MUTATION,
    variables
  );
  return data.updateUser as User;
}

export async function fetchUser(): Promise<{ email: string; name: string; nickname: string; id: string }> {
    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);
    const data = await graphqlClient.request<{ user: { email: string; name: string; nickname: string; id: string } }>(
    FETCH_USER_QUERY,
  );
  return data.user as User;
}