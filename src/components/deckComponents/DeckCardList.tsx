import React from 'react';
import { MtGCard } from '@/types/mtgCard';
import { getManaSymbolUrl } from '@/utils/manaSymbols';
import ManaBar from '@/components/deckComponents/ManaBar';
import styles from '../../styles/DeckCardList.module.css';

interface DeckCardListProps {
  cards: { card: MtGCard; count: number }[];
}

const DeckCardList: React.FC<DeckCardListProps> = ({ cards }) => {

  return (
    <div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {cards.map(({ card, count }) => (
          <div key={card.id} className={styles.cardContainer}>
          <div className={styles.cardImageContainer}>
            <img
              src={card.image_uris.border_crop}
              alt={card.name}
              className={styles.cardImage}
            />
          </div>
          <div className="pt-56 text-center">
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