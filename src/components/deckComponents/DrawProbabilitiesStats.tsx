import React from 'react';
import { DrawProbabilities } from '@/types/mtgDeck';
import styles from '@/styles/DrawProbabilitiesStats.module.css';

interface DrawProbabilitiesStatsProps {
  drawProbabilities: DrawProbabilities;
}

const DrawProbabilitiesStats: React.FC<DrawProbabilitiesStatsProps> = ({ drawProbabilities }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>First Hand Probabilities</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>A Land:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalLands.one * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Two Lands:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalLands.two * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Three Lands:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalLands.three * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>A Creature:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalCreatures * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>A Planeswalker:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalPlaneswalkers * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>A Artifact:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalArtifacts * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>An Enchantment:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalEnchantments * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>An Instant:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalInstants * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>A Sorcery:</span>
          <span className={styles.listItemText}>{(drawProbabilities.totalSorceries * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>One Drops:</span>
          <span className={styles.listItemText}>{(drawProbabilities.oneDrops * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Two Drops:</span>
          <span className={styles.listItemText}>{(drawProbabilities.twoDrops * 100).toFixed(2)}%</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemText}>Three Plus Drops:</span>
          <span className={styles.listItemText}>{(drawProbabilities.threePlusDrops * 100).toFixed(2)}%</span>
        </li>
      </ul>
    </div>
  );
};

export default DrawProbabilitiesStats;