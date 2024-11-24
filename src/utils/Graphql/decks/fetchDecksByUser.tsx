import { MtGDeck } from '@/types/mtgDeck';

export async function fetchDecksByUser(token: string): Promise<MtGDeck[]> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query DecksByUser {
            decksByUser {
                id
                legality
                name
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
              }
            }
            }
      `,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.decksByUser as MtGDeck[];
}