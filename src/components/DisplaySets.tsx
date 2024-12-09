import React from 'react';
import { useRouter } from 'next/navigation';
import { MtgSet } from '@/types/mtgSet';
import { motion } from 'framer-motion';
import styles from '../styles/DisplaySets.module.css';

interface DisplaySetsProps {
  sets: MtgSet[];
}

const DisplaySets: React.FC<DisplaySetsProps> = ({ sets }) => {
  const router = useRouter();

  const handleSetClick = (setId: string) => {
    router.push(`/sets/${setId}`);
  };

  return (
    <div className={styles.gridContainer}>
      {sets.map((set) => {
        return (
          <motion.div
            key={set.set_id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.setCard}
            onClick={() => handleSetClick(set.set_id)}
          >
            <div className={styles.setContent}>
              <h2 className={styles.setTitle}>{set.set_name}</h2>
              <p className={styles.setType}>Type: {set.set_type}</p>
              <p className={styles.releaseDate}>Released: {set.released_at}</p>
              <p className={styles.cardCount}>Total Cards: {set.card_count}</p>
            </div>
            {set.icon_svg_uri && (
              <img src={set.icon_svg_uri} alt={`${set.set_name} icon`} className={styles.setIcon} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default DisplaySets;