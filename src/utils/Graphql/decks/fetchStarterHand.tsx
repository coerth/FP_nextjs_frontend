import { MtGCard } from '../../../types/mtgCard';

export async function fetchStarterHand(deckId: string, token: string): Promise<MtGCard[]> {
    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
        query: `
            query StarterHand($deckId: ID!) {
            starterHand(deckId: $deckId) {
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
                legalities {
                standard
                future
                historic
                gladiator
                pioneer
                explorer
                modern
                legacy
                pauper
                vintage
                penny
                commander
                brawl
                historicbrawl
                alchemy
                paupercommander
                duel
                oldschool
                premodern
                }
            }
            }
        `,
        variables: { deckId },
        }),
    });
    
    const result = await response.json();
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }
    return result.data.starterHand as MtGCard[];
    }