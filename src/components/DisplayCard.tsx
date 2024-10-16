import React from 'react';
import Image from 'next/image';
import { MtGCard } from '@/types/mtgCard';
import { getManaSymbolUrl } from '../utils/manaSymbols';

interface CardProps {
  card: MtGCard;
  onClick: () => void;
}

const DisplayCard: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div className="mtg-card" onClick={onClick}>
      <div className="mtg-card-body">
        <div className="mtg-card-image-container">
          <div className="mtg-card-header">
            <h4 className="font-bold text-lg">{card.name}</h4>
          </div>
          <img src={card.image_uris.art_crop} alt={card.artist} className="mtg-card-image" />
        </div>
        <div className="mtg-card-footer">
          <p>Cost: {card.cmc}</p>
          <div className="mana-symbols">
            {card.color_identity.map((symbol, index) => (
              <Image key={index} src={getManaSymbolUrl(symbol)} alt={symbol} className="mana-symbol" width={20} height={20} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;