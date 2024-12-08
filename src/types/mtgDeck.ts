import { MtGCard } from './mtgCard';

export interface MtGDeck {
  id: string;
  userId: string;
  name: string;
  legality: string;
  cards: {
    card: MtGCard;
    count: number; // Count of the card, with a maximum of 4
  }[];
  deckStats: DeckStats;
}

export interface DeckStats {
  totalCards: number;
  totalUniqueCards: number;
  totalLands: number;
  totalCreatures: number;
  totalPlaneswalkers: number;
  totalArtifacts: number;
  totalEnchantments: number;
  totalInstants: number;
  totalSorceries: number;
  totalManaSymbols: { [key: string]: number };
}

export interface DrawProbabilities {
  totalCards: number;
  totalUniqueCards: number;
  totalLands: LandDrawProbabilities;
  totalCreatures: number;
  totalPlaneswalkers: number;
  totalArtifacts: number;
  totalEnchantments: number;
  totalInstants: number;
  totalSorceries: number;
  oneDrops: number;
  twoDrops: number;
  threePlusDrops: number;
}

export interface LandDrawProbabilities {
  one: number;
  two: number;
  three: number;
}