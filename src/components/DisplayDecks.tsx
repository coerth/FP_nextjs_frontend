import React from 'react';
import { useRouter } from 'next/navigation';
import { MtGDeck } from '@/types/mtgDeck';
import ManaBar from '@/components/deckComponents/ManaBar';
import styles from './DisplayDecks.module.css';

interface DisplayDecksProps {
  decks: MtGDeck[];
}

const calculateManaDistribution = (cards: { card: MtGCard; count: number }[]) => {
  const manaDistribution: { [key: string]: number } = {};

  cards.forEach(({ card, count }) => {
    card.color_identity.forEach((color) => {
      if (!manaDistribution[color]) {
        manaDistribution[color] = 0;
      }
      manaDistribution[color] += count;
    });
  });

  return manaDistribution;
};

const DisplayDecks: React.FC<DisplayDecksProps> = ({ decks }) => {
  const router = useRouter();

  const handleDeckClick = (deckId: string) => {
    router.push(`/decks/${deckId}`);
  };

  return (
    <div className={styles.gridContainer}>
      {decks.map((deck) => {
        const manaDistribution = calculateManaDistribution(deck.cards);
        return (
          <div
            key={deck.id}
            className={styles.deckCard}
            onClick={() => handleDeckClick(deck.id)}
          >
            <h2 className={styles.deckTitle}>{deck.name}</h2>
            <p className={styles.deckLegality}>Legality: {deck.legality}</p>
            <ManaBar manaDistribution={manaDistribution} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayDecks;