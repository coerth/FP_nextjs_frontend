import { graphqlClient, setAuthToken } from '@/lib/graphqlClient';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import { MtGDeck, DrawProbabilities } from '@/types/mtgDeck';


const CREATE_DECK_MUTATION = `
        mutation CreateDeck($name: String!, $legality: String!, $cards: [DeckCardInput!]) {
          createDeck(name: $name, legality: $legality, cards: $cards) {
            id
            legality
            name
          }
        }
      `

const ADD_CARD_TO_DECK_MUTATION = `
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
      `

const FETCH_DECKS_BY_USER_QUERY = `
        query DecksByUser {
            decksByUser {
                userId
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
      `

const FETCH_ALL_DECKS_QUERY = `
        query Decks($limit: Int, $skip: Int) {
          decks(limit: $limit, skip: $skip) {
            userId
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
      `

const FETCH_DECK_AND_PROBABILITIES_QUERY = `
        query CombinedQuery($deckId: ID!, $drawCount: Int!) {
            deck: deck(id: $deckId) {
              userId
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
      `
const FETCH_DECK_BY_ID_QUERY = `
        query Deck($deckId: ID!) {
          deck(id: $deckId) {
            userId
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
        }
      `

const REMOVE_CARD_FROM_DECK_MUTATION = `
      mutation RemoveCardFromDeck($deckId: ID!, $cardId: String!, $count: Int!) {
        removeCardFromDeck(deckId: $deckId, cardId: $cardId, count: $count) {
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
    `;
  
const DELETE_DECK_MUTATION = `
    mutation DeleteDeck($deckId: ID!) {
      deleteDeck(deckId: $deckId) {
        id
      }
    }
  `;

const COPY_DECK_MUTATION = `
    mutation CopyDeck($deckId: ID!, $newName: String!) {
      copyDeck(deckId: $deckId, newName: $newName) {
        id
      }
    }
  `;

const EDIT_DECK_MUTATION = `
  mutation EditDeck($deckId: ID!, $name: String!, $legality: String!) {
    editDeck(deckId: $deckId, name: $name, legality: $legality) {
      id
    }
  }
`;

export async function createDeck({ legality, name, cards }: { legality: string; name: string; cards?: { name: string; count: number }[] }): Promise<MtGDeck> {
  const accessToken = await fetchJWTToken();
  setAuthToken(accessToken);

  const variables = { legality, name, cards };
  const data = await graphqlClient.request<{ createDeck: MtGDeck }>(CREATE_DECK_MUTATION, variables);
  return data.createDeck as MtGDeck;
}

export async function addCardToDeck({deckId, cardId, count,}: {deckId: string; cardId: string; count: number;}): Promise<MtGDeck> {
    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);
    
    const variables = { deckId, cardId, count };
    const data = await graphqlClient.request<{ addCardToDeck: MtGDeck }>(ADD_CARD_TO_DECK_MUTATION, variables);
    return data.addCardToDeck as MtGDeck;
    }

export async function fetchDecksByUser(): Promise<MtGDeck[]> {
    const accessToken = await fetchJWTToken();

    if (!accessToken || accessToken === '') {
      return [];
    }

    setAuthToken(accessToken);
    
    const data = await graphqlClient.request<{ decksByUser: MtGDeck[] }>(FETCH_DECKS_BY_USER_QUERY);
    return data.decksByUser as MtGDeck[];
    }

export async function fetchAllDecks({limit, skip}: {limit: number, skip: number})  : Promise<MtGDeck[]> {
    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);
    
    const variables = { limit, skip };
    const data = await graphqlClient.request<{ decks: MtGDeck[] }>(FETCH_ALL_DECKS_QUERY, variables);
    return data.decks as MtGDeck[];
    }

export async function fetchDeckByIdAndProbabilities({deckId, drawCount}: {deckId: string; drawCount: number;}) {
    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);
    
    const variables = { deckId, drawCount };
    const data = await graphqlClient.request<{ deck: MtGDeck; drawProbabilities: DrawProbabilities }>(FETCH_DECK_AND_PROBABILITIES_QUERY, variables);
    return data;
    }

export async function fetchDeckById(deckId: string): Promise<MtGDeck> {
    const accessToken = await fetchJWTToken();
    setAuthToken(accessToken);
    
    const variables = { deckId };
    const data = await graphqlClient.request<{ deck: MtGDeck }>(FETCH_DECK_BY_ID_QUERY, variables);
    return data.deck as MtGDeck;
    }

export async function removeCardFromDeck({ deckId, cardId, count }: { deckId: string; cardId: string; count: number }): Promise<MtGDeck> {
  const accessToken = await fetchJWTToken();
  setAuthToken(accessToken);

  const variables = { deckId, cardId, count };
  const data = await graphqlClient.request<{ removeCardFromDeck: MtGDeck }>(REMOVE_CARD_FROM_DECK_MUTATION, variables);
  return data.removeCardFromDeck as MtGDeck;
}

export async function deleteDeck({deckId}: {deckId: string}): Promise<MtGDeck> {
  const accessToken = await fetchJWTToken();
  setAuthToken(accessToken);

  const variables = { deckId };
  const data = await graphqlClient.request<{ deleteDeck: MtGDeck }>(DELETE_DECK_MUTATION, variables);
  return data.deleteDeck as MtGDeck;
}

export async function copyDeck({deckId, newName}: {deckId:string, newName:string}): Promise<MtGDeck> {
  const accessToken = await fetchJWTToken();
  setAuthToken(accessToken);

  const variables = { deckId, newName };
  const data = await graphqlClient.request<{ copyDeck: MtGDeck }>(COPY_DECK_MUTATION, variables);
  return data.copyDeck as MtGDeck;
}

export async function editDeck({ deckId, name, legality }: { deckId: string; name: string; legality: string }): Promise<MtGDeck> {
  const accessToken = await fetchJWTToken();
  setAuthToken(accessToken);

  const variables = { deckId, name, legality };
  const data = await graphqlClient.request<{ editDeck: MtGDeck }>(EDIT_DECK_MUTATION, variables);
  return data.editDeck as MtGDeck;
}