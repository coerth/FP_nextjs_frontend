import React from 'react';
import { MtGCard } from '@/types/mtgCard';
import { getManaSymbolUrl } from '@/utils/manaSymbols';
import ManaBar from '@/components/deckComponents/ManaBar';

interface DeckCardListProps {
  cards: { card: MtGCard; count: number }[];
}

const calculateManaDistribution = (cards: { card: MtGCard; count: number }[]) => {
  const manaDistribution: { [key: string]: number } = {};

  cards.forEach(({ card, count }) => {
    card.color_identity.forEach((color) => {
      if (!manaDistribution[color]) {
        manaDistribution[color] = 0;
      }
      manaDistribution[color] += count;
    });
  });

  return manaDistribution;
};

const DeckCardList: React.FC<DeckCardListProps> = ({ cards }) => {
  const manaDistribution = calculateManaDistribution(cards);

  return (
    <div>
      <ManaBar manaDistribution={manaDistribution} />
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map(({ card, count }) => (
          <div
            key={card.id}
            className="relative p-1 border rounded shadow-sm hover:shadow-lg hover:border-blue-500 transition duration-300"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <img
                src={card.image_uris.border_crop}
                alt={card.name}
                className="w-38 h-54 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="pt-56 text-center">
              <h3 className="text-sm font-bold">{card.name}</h3>
              <div className="flex justify-center space-x-1 my-1">
                {card.color_identity.map((symbol, index) => (
                  <img
                    key={index}
                    src={getManaSymbolUrl(symbol)}
                    alt={symbol}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <p className="text-xs">Count: {count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckCardList;