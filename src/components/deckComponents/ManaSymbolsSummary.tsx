import React from 'react';
import { getManaSymbolUrl } from '@/utils/manaSymbols';

interface ManaSymbolsSummaryProps {
  totalManaSymbols: { [key: string]: number };
}

const ManaSymbolsSummary: React.FC<ManaSymbolsSummaryProps> = ({ totalManaSymbols }) => {
  const filteredSymbols = Object.entries(totalManaSymbols).filter(([_, count]) => count > 0);

  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      {filteredSymbols.map(([symbol, count]) => (
        <div key={symbol} className="flex items-center">
          <img src={getManaSymbolUrl(symbol)} alt={symbol} className="w-6 h-6 mr-1" />
          <span>{symbol}: {count}</span>
        </div>
      ))}
    </div>
  );
};

export default ManaSymbolsSummary;