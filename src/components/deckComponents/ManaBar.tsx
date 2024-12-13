// ManaBar.tsx
import React from 'react';
import Image from 'next/image';
import { getManaSymbolColorCode, getManaSymbolUrl } from '@/utils/manaSymbols';

interface ManaBarProps {
  manaDistribution: { [key: string]: number };
  onClick: (symbol: string) => void; 
}

const ManaBar: React.FC<ManaBarProps> = ({ manaDistribution, onClick }) => {
  const totalMana = Object.values(manaDistribution).reduce((acc, count) => acc + count, 0);

  return (
    <div className="flex items-center mb-4 h-8 bg-gray-200 rounded overflow-hidden">
      {Object.entries(manaDistribution).map(([color, count]) => (
        <div
          key={color}
          className="flex items-center justify-center cursor-pointer"
          style={{ width: `${(count / totalMana) * 100}%`, backgroundColor: getManaSymbolColorCode(color), minWidth: '40px' }}
          onClick={() => onClick(color)} 
        >
          <div className="flex items-center justify-center p-1">
           <Image src={getManaSymbolUrl(color)} alt={color} width={24} height={24} className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManaBar;
