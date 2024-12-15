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

const GET_USER_QUERY = `
  query GetUser($email: String!) {
    user(email: $email) {
      id
      email
    }
  }
`;

const CREATE_USER_MUTATION = `
  mutation CreateUser($sub: String!, $email: String!, $name: String!) {
    createUser(sub: $sub, email: $email, name: $name) {
      id
      email
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

    if (!accessToken || accessToken === '') {
      return { email: '', name: '', nickname: '', id: '' };
    }

    setAuthToken(accessToken);
    const data = await graphqlClient.request<{ user: { email: string; name: string; nickname: string; id: string } }>(
    FETCH_USER_QUERY,
  );
  return data.user as User;
}

export async function handleUserCallback(req: any, res: any, session: any) {
  if (!session || !session.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const { user, accessToken } = session;

  setAuthToken(accessToken);

  // Check if the user exists in the database
  const variables = { email: user.email };
  const data = await graphqlClient.request<{ user: { id: string; email: string } }>(GET_USER_QUERY, variables);

  // If the user does not exist, create a new user
  if (!data.user) {
    const mutationVariables = {
      sub: user.sub,
      email: user.email,
      name: user.name,
    };

    await graphqlClient.request(CREATE_USER_MUTATION, mutationVariables);
  }
}