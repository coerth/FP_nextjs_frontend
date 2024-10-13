import { MtGCard } from './mtgCard';

export interface MtGDeck {
    id: string;
    name: string;
    description: string;
    cards: {
        card: MtGCard;
        count: number; // Count of the card, with a maximum of 4
    }[];
}