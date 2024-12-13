import React from 'react';
import { MtGCard } from '@/types/mtgCard';
import { getManaSymbolUrl } from '@/utils/manaSymbols';
import styles from '../../styles/CardList.module.css';

interface DeckCardListProps {
  cards: { card: MtGCard; count: number }[];
  isOwner: boolean;
  onIncreaseCardCount: (cardId: string) => void;
  onDecreaseCardCount: (cardId: string) => void;
}

const DeckCardList: React.FC<DeckCardListProps> = ({ cards, isOwner, onIncreaseCardCount, onDecreaseCardCount }) => {
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
            
            {isOwner && (
            <div className="flex space-x-2">
              <button onClick={() => onIncreaseCardCount(card.id)} className="copyButton">+</button>
              <button onClick={() => onDecreaseCardCount(card.id)} className="deleteButton">-</button>
            </div>
          )}
            <p className={styles.cardCount}>Count: {count}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
  );
};

export default DeckCardList;