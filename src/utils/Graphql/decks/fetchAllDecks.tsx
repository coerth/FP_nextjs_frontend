import { MtGDeck } from '@/types/mtgDeck';

export async function fetchAllDecks(limit: number, skip: number, token: string): Promise<MtGDeck[]> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query Decks($limit: Int, $skip: Int) {
          decks(limit: $limit, skip: $skip) {
            deckStats {
              totalCards
              totalUniqueCards
              totalLands
              totalCreatures
              totalPlaneswalkers
              totalArtifacts
              totalEnchantments
              totalInstants
              totalSorceries
              totalManaSymbols
              oneDrops
              twoDrops
              threePlusDrops
            }
            id
            legality
            name
            
          }
        }
      `,
      variables: { limit, skip },
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.decks as MtGDeck[];
}