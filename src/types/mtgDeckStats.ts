import { MtGCard } from './mtgCard';

export interface MtGDeckStats {
    id: string;
    name: string;
    description: string;
    cards: {
        card: MtGCard;
        count: number;
    }[];
    totalCards: number;
    totalUniqueCards: number;
    totalLands: number;
    totalCreatures: number;
    totalPlaneswalkers: number;
    totalArtifacts: number;
    totalEnchantments: number;
    totalInstants: number;
    totalSorceries: number;
    totalOtherSpells: number;
    totalManaSymbols: {
        [key: string]: number;
    };
}