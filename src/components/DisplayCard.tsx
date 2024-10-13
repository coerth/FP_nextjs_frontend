import React from 'react';
import { MtGCard } from '@/types/mtgCard';

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
          <img src={card.image_uris.border_crop} alt={card.artist} className="mtg-card-image" />
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;