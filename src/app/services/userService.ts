import { graphqlClient, setAuthToken } from '@/lib/graphqlClient';
import { fetchJWTToken } from '@/utils/fetchJWTToken';

const UPDATE_USER_MUTATION = `
  mutation UpdateUser($name: String!, $nickname: String!) {
    updateUser(name: $name, nickname: $nickname) {
      id
      name
      nickname
    }
  }
`;

export async function updateUser(name: string, nickname: string): Promise<{ id: string; name: string; nickname: string }> {

    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);
    const variables = { name, nickname };
    const data = await graphqlClient.request<{ updateUser: { id: string; name: string; nickname: string } }>(
    UPDATE_USER_MUTATION,
    variables
  );
  return data.updateUser;
}
