import React from 'react';
import { useRouter } from 'next/navigation';
import { MtGDeck } from '@/types/mtgDeck';
import ManaBar from '@/components/deckComponents/ManaBar';
import { motion } from 'framer-motion';
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
      {decks.map((deck) => {
        return (
          <motion.div
            key={deck.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.deckCard}
            onClick={() => handleDeckClick(deck.id)}
          >
            <h2 className={styles.deckTitle}>{deck.name}</h2>
            <p className={styles.deckLegality}>Legality: {deck.legality}</p>
            <ManaBar manaDistribution={deck.deckStats.totalManaSymbols} />
            <p className={styles.cardCount}>Total Cards: {deck.deckStats.totalCards}</p>
            <p className={styles.cardCount}>Total Unique Cards: {deck.deckStats.totalUniqueCards}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DisplayDecks;