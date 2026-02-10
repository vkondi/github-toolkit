'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { LanguageStats } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguageChartProps {
  data: LanguageStats[];
}

export default function LanguageChart({ data }: LanguageChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    setIsMobile(window.innerWidth < 768);

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const colors = [
    '#CCFF00',
    '#FF00FF',
    '#00F0FF',
    '#FF6B9D',
    '#C44569',
    '#FFA502',
    '#60CCFF',
    '#95FF00',
    '#FF3333',
    '#00FF88',
  ];

  const chartData = {
    labels: data.map((item) => item.language),
    datasets: [
      {
        data: data.map((item) => item.percentage),
        backgroundColor: colors.slice(0, data.length),
        borderColor: '#1A1A1A',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: (isMobile ? 'bottom' : 'right') as 'bottom' | 'right',
        labels: {
          usePointStyle: true,
          padding: isMobile ? 10 : 20,
          font: {
            size: isMobile ? 12 : 14,
          },
          color: '#FFFFFF',
        },
      },
      tooltip: {
        backgroundColor: '#1A1A1A',
        titleColor: '#CCFF00',
        bodyColor: '#FFFFFF',
        borderColor: '#CCFF00',
        borderWidth: 1,
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value.toFixed(1)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="h-80 md:h-96">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
