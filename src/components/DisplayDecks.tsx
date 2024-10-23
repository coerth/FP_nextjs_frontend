import React from 'react';
import { useRouter } from 'next/navigation';
import { MtGDeck } from '@/types/mtgDeck';
import styles from './DisplayDecks.module.css';

interface DisplayDecksProps {
  decks: MtGDeck[];
}

const DisplayDecks: React.FC<DisplayDecksProps> = ({ decks }) => {
  const router = useRouter();

  const handleDeckClick = (deckId: string) => {
    router.push(`/decks/${deckId}`);
  };

  return (
    <div className={styles.gridContainer}>
      {decks.map((deck) => (
        <div
          key={deck.id}
          className={styles.deckCard}
          onClick={() => handleDeckClick(deck.id)}
        >
          <h2 className={styles.deckTitle}>{deck.name}</h2>
          <p className={styles.deckLegality}>Legality: {deck.legality}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayDecks;