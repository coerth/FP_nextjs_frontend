import React from 'react';
import ManaSymbolsHistogram from '@/components/deckComponents/ManaSymbolsHistogram';
import ManaSymbolsSummary from '@/components/deckComponents/ManaSymbolsSummary';
import DeckStatsSummary from '@/components/deckComponents/DeckStatsSummary';
import DrawProbabilitiesStats from '@/components/deckComponents/DrawProbabilitiesStats';
import { DeckStats as DeckStatsType, DrawProbabilities } from '@/types/mtgDeck';

interface DeckStatsProps {
  deckStats: DeckStatsType;
  onHistogramClick: () => void;
  drawProbabilities: DrawProbabilities;
}

const DeckStats: React.FC<DeckStatsProps> = ({ deckStats, onHistogramClick, drawProbabilities }) => {
  return (
    <div>
      <ManaSymbolsSummary totalManaSymbols={deckStats.totalManaSymbols} />
      <ManaSymbolsHistogram totalManaSymbols={deckStats.totalManaSymbols} onHistogramClick={onHistogramClick} />
      <DeckStatsSummary deckStats={deckStats} />
      <DrawProbabilitiesStats drawProbabilities={drawProbabilities} />
    </div>
  );
};

export default DeckStats;