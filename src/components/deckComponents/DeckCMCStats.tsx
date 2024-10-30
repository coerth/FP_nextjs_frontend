import React from 'react';
import { MtGCard } from '@/types/mtgCard';
import CMCDistributionHistogram from '@/components/deckComponents/CMCDistributionHistogram';

interface DeckCMCStatsProps {
  cards: { card: MtGCard; count: number }[];
}

const DeckCMCStats: React.FC<DeckCMCStatsProps> = ({ cards }) => {
  const cmcValues = cards.flatMap(({ card, count }) => Array(count).fill(card.cmc));
  const totalCMC = cmcValues.reduce((acc, cmc) => acc + cmc, 0);
  const averageCMC = totalCMC / cmcValues.length;

  const sortedCMC = [...cmcValues].sort((a, b) => a - b);
  const medianCMC =
    sortedCMC.length % 2 === 0
      ? (sortedCMC[sortedCMC.length / 2 - 1] + sortedCMC[sortedCMC.length / 2]) / 2
      : sortedCMC[Math.floor(sortedCMC.length / 2)];

  return (
    <div className="p-4 bg-gray-800 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white underline">Combined Mana Cost Statistics</h2>
      <ul className="space-y-2 mb-4">
        <li className="flex justify-between p-2 bg-gray-700 rounded shadow">
          <span className="text-white">Average CMC:</span>
          <span className="text-white">{averageCMC.toFixed(2)}</span>
        </li>
        <li className="flex justify-between p-2 bg-gray-700 rounded shadow">
          <span className="text-white">Median CMC:</span>
          <span className="text-white">{medianCMC}</span>
        </li>
      </ul>
      <CMCDistributionHistogram cmcValues={cmcValues} />
    </div>
  );
};

export default DeckCMCStats;