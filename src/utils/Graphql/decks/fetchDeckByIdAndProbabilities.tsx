import { MtGDeck, DrawProbabilities } from '@/types/mtgDeck';

interface FetchDeckAndProbabilitiesResult {
    deck: MtGDeck;
    drawProbabilities: DrawProbabilities;
    }

export async function FetchDeckAndProbabilities(deckId: string, token: string): Promise<FetchDeckAndProbabilitiesResult> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query CombinedQuery($deckId: ID!, $drawCount: Int!) {
            deck: deck(id: $deckId) {
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
            drawProbabilities: drawProbabilities(deckId: $deckId, drawCount: $drawCount) {
              totalCards
              totalUniqueCards
              totalCreatures
              totalPlaneswalkers
              totalArtifacts
              totalEnchantments
              totalInstants
              totalSorceries
              oneDrops
              threePlusDrops
              twoDrops
              totalLands {
                one
                two
                three
              }
            }
    }
      `,
      variables: { deckId, drawCount: 7 },
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return {
    deck: result.data.deck as MtGDeck,
    drawProbabilities: result.data.drawProbabilities as DrawProbabilities,
  };
}