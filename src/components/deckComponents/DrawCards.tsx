import React, { useState } from 'react';
import { MtGCard } from '@/types/mtgCard';

interface DrawCardsProps {
  cards: { card: MtGCard; count: number }[];
}

const DrawCards: React.FC<DrawCardsProps> = ({ cards }) => {
  const [drawnCards, setDrawnCards] = useState<MtGCard[]>([]);
  const [numCards, setNumCards] = useState<number>(7);

  // Flatten the list of cards based on their count
  const flattenedCards = cards.flatMap(({ card, count }) =>
    Array(count).fill(card)
  );

  const handleDraw = () => {
    // Flatten the list of cards based on their count
    const deck = cards.flatMap(({ card, count }) => Array(count).fill(card));

    // Fisher-Yates shuffle algorithm
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Draw the specified number of cards
    const drawn = deck.slice(0, numCards);
    setDrawnCards(drawn);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Draw Cards</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="numCards" className="mr-2">Number of cards:</label>
        <input
          type="number"
          id="numCards"
          value={numCards}
          onChange={(e) => setNumCards(Number(e.target.value))}
          className="p-2 border bg-black border-gray-300 rounded"
          min="1"
          max={flattenedCards.length}
        />
        <button
          onClick={handleDraw}
          className="editButton"
        >
          Draw
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4">
        {drawnCards.map((card, index) => (
          <div key={index} className="border p-2 rounded flex-shrink-0" style={{ width: '150px' }}>
            <img src={card.image_uris?.border_crop} alt={card.name} className="w-full h-auto" />
            <p className="mt-2 text-sm">{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawCards;