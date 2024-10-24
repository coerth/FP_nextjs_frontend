import React from 'react';
import { getManaSymbolUrl, getManaSymbolColorCode } from '@/utils/manaSymbols';

interface ManaBarProps {
  manaDistribution: { [key: string]: number };
}

const ManaBar: React.FC<ManaBarProps> = ({ manaDistribution }) => {
  const totalMana = Object.values(manaDistribution).reduce((acc, count) => acc + count, 0);

  return (
    <div className="flex items-center mb-4 h-8 bg-gray-200 rounded overflow-hidden">
      {Object.entries(manaDistribution).map(([color, count]) => (
        <div
          key={color}
          className="flex items-center justify-center"
          style={{ width: `${(count / totalMana) * 100}%`, backgroundColor: getManaSymbolColorCode(color) }}
        >
          <div className="flex items-center justify-center p-1 ">
            <img src={getManaSymbolUrl(color)} alt={color} className="w-6 h-6" />
            {/* <span className="ml-1 text-sm text-white">{count}</span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManaBar;