// src/utils/fetchCards.ts
export async function fetchCards(limit: number) {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Cards($limit: Int) {
            cards(limit: $limit) {
              id
              artist
              arena_id
              scryfall_set_uri
              image_uris {
                small
              }
            }
          }
        `,
        variables: { limit },
      }),
    });
  
    const result = await response.json();
    return result.data.cards;
  }