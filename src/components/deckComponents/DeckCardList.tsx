import React from 'react';
import { MtGCard } from '@/types/mtgCard';
import { getManaSymbolUrl } from '@/utils/manaSymbols';
import styles from '../../styles/CardList.module.css';

interface DeckCardListProps {
  cards: { card: MtGCard; count: number }[];
}

const DeckCardList: React.FC<DeckCardListProps> = ({ cards }) => {

  return (
    <div>
      <div className={styles.gridContainer}>
      {cards.map(({ card, count }) => (
        <div key={card.id} className={styles.cardContainer}>
          <div className={styles.cardImageContainer}>
            <img
              src={card.image_uris.border_crop}
              alt={card.name}
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardDetails}>
            <h3 className={styles.cardName}>{card.name}</h3>
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
            <p className={styles.cardCount}>Count: {count}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
  );
};

export default DeckCardList;