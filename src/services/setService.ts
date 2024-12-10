import { graphqlClient, setAuthToken } from '@/lib/graphqlClient';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import { MtgSet } from '@/types/mtgSet';

const FETCH_SETS_QUERY = `
          query Sets($limit: Int, $skip: Int) {
            sets(limit: $limit, skip: $skip) {
              set_id
              name
              set_type
              card_count
              released_at
              icon_svg_uri
            }
          }
        `

        export async function fetchSets({ limit, skip }: { limit: number; skip: number }): Promise<MtgSet[]> {
          try {
            const accessToken = await fetchJWTToken();
            setAuthToken(accessToken);
        
            const variables = { limit, skip };
            console.log('Fetching sets with variables:', variables); // Log the request variables
        
            const data = await graphqlClient.request<{ sets: MtgSet[] }>(FETCH_SETS_QUERY, variables);
            console.log('Fetched sets data:', data); // Log the response data
        
            return data.sets as MtgSet[];
          } catch (error) {
            console.error('Error fetching sets:', error); // Log the error
            throw error;
          }
        }