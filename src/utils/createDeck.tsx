// src/utils/createDeck.ts
import { MtGDeck } from "@/types/mtgDeck";

export async function createDeck(legality: string, name: string, token: string): Promise<MtGDeck> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation CreateDeck($legality: String!, $name: String!) {
          createDeck(legality: $legality, name: $name) {
            id
            name
            legality
          }
        }
      `,
      variables: { legality, name },
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.createDeck as MtGDeck;
}