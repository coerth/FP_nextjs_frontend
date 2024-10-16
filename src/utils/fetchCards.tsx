// src/utils/fetchCards.ts
import { MtGCard } from "@/types/mtgCard";

export async function fetchCards(limit: number, skip: number, lang: string, token: string): Promise<MtGCard[]> {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
           query Cards($skip: Int, $limit: Int, $lang: String) {
            cards(skip: $skip, limit: $limit, lang: $lang) {
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
              lang
            }
          }
        `,
        variables: { limit, skip, lang },
      }),
    });
  
    const result = await response.json();
    return result.data.cards as MtGCard[];
  }