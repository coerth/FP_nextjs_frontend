import { graphqlClient, setAuthToken } from '@/lib/graphqlClient';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import { MtGCard } from '@/types/mtgCard';
import { FetchCardsParams } from '@/types/fetchCardsParams';

const FETCH_CARDS_QUERY = `
  query Cards($params: CardSearchParams) {
    cards(params: $params) {
      id
      artist
      arena_id
      scryfall_set_uri
      image_uris {
        border_crop
        art_crop
      }
      cmc
      name
      set_name
      mtgo_id
      color_identity
      colors
      type_line
      lang
      set_id
      legalities {
        standard
        future
        historic
        gladiator
        pioneer
        explorer
        modern
        legacy
        pauper
        vintage
        penny
        commander
        brawl
        historicbrawl
        alchemy
        paupercommander
        duel
        oldschool
        premodern
      }
    }
  }
`;

export async function fetchCards(params: FetchCardsParams): Promise<MtGCard[]> {
  const accessToken = await fetchJWTToken();
  setAuthToken(accessToken);

  const variables = { params };
  const data = await graphqlClient.request<{ cards: MtGCard[] }>(FETCH_CARDS_QUERY, variables);
  return data.cards;
}