import React from 'react';
import ManaSymbolsHistogram from '@/components/deckComponents/ManaSymbolsHistogram';
import ManaSymbolsSummary from '@/components/deckComponents/ManaSymbolsSummary';
import DeckStatsSummary from '@/components/deckComponents/DeckStatsSummary';
import { DeckStats as DeckStatsType } from '@/types/mtgDeck';

interface DeckStatsProps {
  deckStats: DeckStatsType;
  onHistogramClick: () => void;
}

const DeckStats: React.FC<DeckStatsProps> = ({ deckStats, onHistogramClick }) => {
  return (
    <div>
      <ManaSymbolsSummary totalManaSymbols={deckStats.totalManaSymbols} />
      <ManaSymbolsHistogram totalManaSymbols={deckStats.totalManaSymbols} onHistogramClick={onHistogramClick} />
      <DeckStatsSummary deckStats={deckStats} />
    </div>
  );
};

export default DeckStats;