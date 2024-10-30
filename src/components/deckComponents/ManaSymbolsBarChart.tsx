import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Plugin } from 'chart.js';
import { getManaSymbolColorCode, getManaSymbolUrl } from '@/utils/manaSymbols';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ChartDataLabels);

interface ManaSymbolsBarChartProps {
  totalManaSymbols: { [key: string]: number } | null;
}

const ManaSymbolsBarChart: React.FC<ManaSymbolsBarChartProps> = ({ totalManaSymbols }) => {
  const [tooltipData, setTooltipData] = useState<{ symbol: string; count: number } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  if (!totalManaSymbols) {
    return <p>No mana symbols available</p>;
  }

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
      title: {
        display: true,
        text: 'Mana Symbols Histogram',
      },
      tooltip: {
        enabled: false, // Disable default tooltip
        external: ({ chart, tooltip }) => {
          if (!chart || !tooltip || !tooltip.dataPoints.length) {
            setTooltipData(null);
            setTooltipPosition(null);
            return;
          }
      
          const { dataPoints } = tooltip;
          const chartArea = chart.chartArea; // Get chartArea safely
      
          if (dataPoints.length && chartArea) {
            const { label, raw } = dataPoints[0];
            setTooltipData({ symbol: label, count: raw });
      
            // Update tooltip position to mouse coordinates, ensuring chartArea is defined
            setTooltipPosition({
              x: chartArea.left + (dataPoints[0].x + dataPoints[0].width / 2),
              y: dataPoints[0].y,
            });
          }
        },
      },
      
      datalabels: {
        color: 'white', // Adjust color for better visibility
        anchor: 'end', // Position the label at the end of the bar
        align: 'end', // Align the label at the end of the bar
        formatter: (value: number, context: any) => {
          const symbol = context.chart.data.labels[context.dataIndex];
          return symbol; // Show the mana symbol as the label
        },
      },
    },
    scales: {
      x: {
        display: false, // Hides x-axis labels
      },
      y: {
        ticks: {
          stepSize: 1, // Ensures only whole numbers are displayed
          callback: function (value) {
            return Number.isInteger(value) ? value : null; // Filters out decimal values
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-2 mb-4">
        {filteredSymbols.map(([symbol]) => (
          <div key={symbol} className="flex items-center">
            <img src={getManaSymbolUrl(symbol)} alt={symbol} className="w-6 h-6 mr-1" />
            <span>{symbol}</span>
          </div>
        ))}
      </div>
      <div className="relative h-64">
        <Bar data={data} options={options} />
        {tooltipData && tooltipPosition && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '5px',
              borderRadius: '4px',
              zIndex: 100,
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            <img
              src={getManaSymbolUrl(tooltipData.symbol)}
              alt={tooltipData.symbol}
              style={{ width: '20px', height: '20px', marginRight: '5px' }}
            />
            <span>
              {tooltipData.symbol}: {tooltipData.count}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManaSymbolsBarChart;
