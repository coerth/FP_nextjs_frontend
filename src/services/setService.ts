import { graphqlClient, setAuthToken } from '@/lib/graphqlClient';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import { MtgSet } from '@/types/mtgSet';

const FETCH_SETS_QUERY = `
          query Sets($limit: Int) {
            sets(limit: $limit) {
              set_id,
              set_name,
              set_uri
            }
          }
        `

export async function fetchSets({ limit }: { limit: number }) {
    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);

    const variables = { limit };
    const data = await graphqlClient.request<{ sets: MtgSet[] }>(FETCH_SETS_QUERY, variables);
    return data.sets as MtgSet[];
}