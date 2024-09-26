// src/utils/fetchCards.ts
import { MtGCard } from "@/types/mtgCard";

export async function fetchCards(limit: number, skip: number): Promise<MtGCard[]> {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
           query Cards($limit: Int, $skip: Int) {
            cards(limit: $limit, skip: $skip) {
              id
              artist
              arena_id
              scryfall_set_uri
              image_uris {
                border_crop
              }
              cmc
              name
              set_name
            }
          }
        `,
        variables: { limit, skip },
      }),
    });
  
    const result = await response.json();
    return result.data.cards as MtGCard[];
  }