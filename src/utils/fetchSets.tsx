// src/utils/fetchCards.ts
export async function fetchCards(limit: number) {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Sets($limit: Int) {
            sets(limit: $limit) {
              set_id,
              set_name,
              set_uri
            }
          }
        `,
        variables: { limit },
      }),
    });
  
    const result = await response.json();
    return result.data.sets;
  }