import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useCalculationStore } from '../store/calculationStore';
import { formatCurrency } from '../utils/calculations';

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface InvestmentChartsProps {
  className?: string;
}

export const InvestmentCharts: React.FC<InvestmentChartsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { result, selectedChart, setSelectedChart } = useCalculationStore();

  if (!result) return null;

  // 增长曲线图表配置
  const growthChartData = {
    labels: result.yearlyData.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label: t('results.finalValue'),
        data: result.yearlyData.map(data => data.totalValue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: t('results.totalInvestment'),
        data: result.yearlyData.map(data => data.totalInvestment),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const growthChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: t('results.growthChart'),
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t('inputs.investmentPeriod') + ' (' + t('inputs.years') + ')',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: t('common.currency'),
        },
        ticks: {
          callback: function (value) {
            return formatCurrency(value as number);
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  // 收益构成饼图配置
  const compositionChartData = {
    labels: [t('results.totalInvestment'), t('results.totalInterest')],
    datasets: [
      {
        data: [result.totalInvestment, result.totalInterest],
        backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(59, 130, 246, 0.8)'],
        borderColor: ['rgb(16, 185, 129)', 'rgb(59, 130, 246)'],
        borderWidth: 2,
      },
    ],
  };

  const compositionChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          generateLabels: function (chart) {
            const data = chart.data;
            const dataset = data.datasets[0];
            return (
              data.labels?.map((label, index) => ({
                text: `${label}: ${formatCurrency(dataset.data[index] as number)}`,
                fillStyle: Array.isArray(dataset.backgroundColor)
                  ? dataset.backgroundColor[index]
                  : dataset.backgroundColor || '',
                strokeStyle: Array.isArray(dataset.borderColor)
                  ? dataset.borderColor[index]
                  : dataset.borderColor || '',
                pointStyle: 'circle' as const,
                hidden: false,
                index,
              })) || []
            );
          },
        },
      },
      title: {
        display: true,
        text: t('results.compositionChart'),
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = (((context.parsed as number) / total) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(context.parsed as number)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 图表切换按钮 */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setSelectedChart('growth')}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${
              selectedChart === 'growth'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }
          `}
        >
          {t('results.growthChart')}
        </button>
        <button
          onClick={() => setSelectedChart('composition')}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${
              selectedChart === 'composition'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }
          `}
        >
          {t('results.compositionChart')}
        </button>
      </div>

      {/* 图表容器 */}
      <div className="bg-card border rounded-lg p-4">
        <div className="relative h-80 md:h-96">
          {selectedChart === 'growth' ? (
            <Line data={growthChartData} options={growthChartOptions} />
          ) : (
            <Doughnut data={compositionChartData} options={compositionChartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};
