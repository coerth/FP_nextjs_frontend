import { MtGCard } from "@/types/mtgCard";

interface FetchCardsParams {
  limit?: number;
  skip?: number;
  lang?: string;
  color?: string;
  name?: string;
  type?: string;
}

export async function fetchCards(params: FetchCardsParams, token: string): Promise<MtGCard[]> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
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
          }
        }
      `,
      variables: { params },
    }),
  });

  const result = await response.json();
  return result.data.cards as MtGCard[];
}