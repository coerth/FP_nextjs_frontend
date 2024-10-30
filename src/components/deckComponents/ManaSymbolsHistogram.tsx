import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getManaSymbolColorCode, getManaSymbolUrl } from '@/utils/manaSymbols';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ManaSymbolsHistogramProps {
  totalManaSymbols: { [key: string]: number };
  onHistogramClick: () => void;
}

const ManaSymbolsHistogram: React.FC<ManaSymbolsHistogramProps> = ({ totalManaSymbols, onHistogramClick }) => {
  const filteredSymbols = Object.entries(totalManaSymbols).filter(([_, count]) => count > 0);
  const labels = filteredSymbols.map(([symbol]) => symbol);
  const data = {
    labels,
    datasets: [
      {
        label: 'Mana Symbols',
        data: filteredSymbols.map(([, count]) => count),
        backgroundColor: filteredSymbols.map(([symbol]) => getManaSymbolColorCode(symbol)),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Mana Symbols Histogram',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const symbol = context.label;
            const count = context.raw;
            return [`${symbol}: ${count}`];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="relative h-64">
      <Bar data={data} options={options} onClick={onHistogramClick} />
    </div>
  );
};

export default ManaSymbolsHistogram;