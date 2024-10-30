import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CMCDistributionHistogramProps {
  cmcValues: number[];
}

const CMCDistributionHistogram: React.FC<CMCDistributionHistogramProps> = ({ cmcValues }) => {
  const cmcDistribution = cmcValues.reduce((acc, cmc) => {
    acc[cmc] = (acc[cmc] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  const data = {
    labels: Object.keys(cmcDistribution).map(Number),
    datasets: [
      {
        label: 'CMC Distribution',
        data: Object.values(cmcDistribution),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        text: 'CMC Distribution',
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default CMCDistributionHistogram;