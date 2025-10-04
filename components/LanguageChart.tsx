'use client'

import { useEffect, useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { LanguageStats } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend)

interface LanguageChartProps {
  data: LanguageStats[]
}

export default function LanguageChart({ data }: LanguageChartProps) {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ]

  const chartData = {
    labels: data.map(item => item.language),
    datasets: [
      {
        data: data.map(item => item.percentage),
        backgroundColor: colors.slice(0, data.length),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || ''
            const value = context.parsed
            return `${label}: ${value.toFixed(1)}%`
          }
        }
      }
    }
  }

  return (
    <div className="h-96">
      <Doughnut data={chartData} options={options} />
    </div>
  )
}
