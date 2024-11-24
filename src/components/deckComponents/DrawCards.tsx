import React, { useState } from 'react';
import { MtGCard } from '@/types/mtgCard';

interface DrawCardsProps {
  cards: MtGCard[];
}

const DrawCards: React.FC<DrawCardsProps> = ({ cards }) => {
  const [drawnCards, setDrawnCards] = useState<MtGCard[]>([]);
  const [numCards, setNumCards] = useState<number>(7);

  const handleDraw = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffledCards.slice(0, numCards));
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
          max={cards.length}
        />
        <button
          onClick={handleDraw}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Draw
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4">
        {drawnCards.map((card) => (
          <div key={card.id} className="border p-2 rounded flex-shrink-0" style={{ width: '150px' }}>
            <img src={card.image_uris?.border_crop} alt={card.name} className="w-full h-auto" />
            <p className="mt-2 text-sm">{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawCards;