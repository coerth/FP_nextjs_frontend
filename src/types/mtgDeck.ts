import { MtGCard } from './mtgCard';

export interface MtGDeck {
  id: string;
  user: User;
  name: string;
  legality: string;
  cards: {
    card: MtGCard;
    count: number; // Count of the card, with a maximum of 4
  }[];
  deckStats: DeckStats;
}

export interface User {
  id: string;
  username: string;
  email: string;
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

