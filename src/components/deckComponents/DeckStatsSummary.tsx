import React from 'react';
import { DeckStats } from '@/types/mtgDeck';
import styles from '@/styles/DeckStatsSummary.module.css';

interface DeckStatsSummaryProps {
  deckStats: DeckStats;
}

const DeckStatsSummary: React.FC<DeckStatsSummaryProps> = ({ deckStats }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Deck Statistics</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Cards:</span>
          <span className={styles.listItemText}>{deckStats.totalCards}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Unique Cards:</span>
          <span className={styles.listItemText}>{deckStats.totalUniqueCards}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Lands:</span>
          <span className={styles.listItemText}>{deckStats.totalLands}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Creatures:</span>
          <span className={styles.listItemText}>{deckStats.totalCreatures}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Planeswalkers:</span>
          <span className={styles.listItemText}>{deckStats.totalPlaneswalkers}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Artifacts:</span>
          <span className={styles.listItemText}>{deckStats.totalArtifacts}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Enchantments:</span>
          <span className={styles.listItemText}>{deckStats.totalEnchantments}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Instants:</span>
          <span className={styles.listItemText}>{deckStats.totalInstants}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Total Sorceries:</span>
          <span className={styles.listItemText}>{deckStats.totalSorceries}</span>
        </li>
      </ul>
    </div>
  );
};

export default DeckStatsSummary;