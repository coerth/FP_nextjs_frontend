import React, { useState, useEffect } from 'react';
import { MtGCard } from '@/types/mtgCard';
import { getManaSymbolUrl } from '@/utils/manaSymbols';
import { motion } from 'framer-motion';
import styles from '../styles/CardList.module.css';

interface CardProps {
  card: MtGCard;
  onClick: () => void;
}

const DisplayCard: React.FC<CardProps> = ({ card, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAlternateImage, setShowAlternateImage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => {
        setShowAlternateImage(true);
      }, 1000); // Show alternate image after 1 second
    } else {
      setShowAlternateImage(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={styles.cardContainer}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardImageContainer}>
        {/* Main Image */}
        <img
          src={showAlternateImage ? card.image_uris.border_crop : card.image_uris.border_crop}
          alt={card.name}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardDetails}>
        <h3 className={styles.cardName}>{card.name}</h3>
        <p className={styles.cardCount}>{card.type_line}</p>
        <div className={styles.colorIcons}>
          {card.color_identity.map((symbol, index) => (
            <img
              key={index}
              src={getManaSymbolUrl(symbol)}
              alt={symbol}
              className="w-4 h-4"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DisplayCard;