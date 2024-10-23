import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MtGCard } from '@/types/mtgCard';
import { getManaSymbolUrl } from '@/utils/manaSymbols';

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
    <div
      className="mtg-card"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mtg-card-body">
        <div className="mtg-card-image-container">
          <div className="mtg-card-header">
            <h4 className="font-bold text-lg">{card.name}</h4>
          </div>
          <img
            src={card.image_uris.art_crop}
            alt={card.artist}
            className="mtg-card-image"
          />
          {showAlternateImage && (
            <img
              src={card.image_uris.border_crop}
              alt={card.artist}
              className="mtg-card-full-image"
            />
          )}
        </div>
        <div className="mtg-card-footer">
          <div className="type-cost">
            <p className="type-line">{card.type_line}</p>
          </div>
          <div className="mana-symbols">
            {card.color_identity.length > 0 ? (
              card.color_identity.map((symbol, index) => (
                <Image key={index} src={getManaSymbolUrl(symbol)} alt={symbol} className="mana-symbol" width={20} height={20} />
              ))
            ) : (
              <Image src={getManaSymbolUrl('')} alt="Neutral" className="mana-symbol" width={20} height={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;