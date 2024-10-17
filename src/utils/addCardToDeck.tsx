import { MtGDeck } from '@/types/mtgDeck';

export async function addCardToDeck(deckId: string, cardId: string, count: number, token: string): Promise<MtGDeck> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation AddCardToDeck($deckId: String!, $cardId: String!, $count: Int!) {
          addCardToDeck(deckId: $deckId, cardId: $cardId, count: $count) {
            cards {
                card {
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
                count
                }
                id
                legality
                name
            }
            }
      `,
      variables: { deckId, cardId, count },
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.addCardToDeck as MtGDeck;
}