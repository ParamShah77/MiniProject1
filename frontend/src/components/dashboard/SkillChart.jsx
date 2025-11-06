import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Card from '../common/Card';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SkillChart = ({ type = 'bar', data, title, subtitle }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker'],
    datasets: [
      {
        label: 'Your Skills',
        data: [85, 70, 60, 45, 40, 30],
        backgroundColor: 'rgba(33, 128, 141, 0.8)',
        borderColor: 'rgba(33, 128, 141, 1)',
        borderWidth: 2,
      },
      {
        label: 'Required Skills',
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(167, 169, 169, 0.3)',
        borderColor: 'rgba(167, 169, 169, 0.5)',
        borderWidth: 2,
      },
    ],
  };

  const chartData = data || defaultData;

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--color-text-primary')
            .trim() || '#13343B',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        cornerRadius: 8,
      },
    },
    scales: type !== 'doughnut' ? {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    } : {},
  };

  // Render appropriate chart type
  const renderChart = () => {
    const chartHeight = type === 'doughnut' ? '300px' : '400px';

    switch (type) {
      case 'line':
        return (
          <div style={{ height: chartHeight }}>
            <Line data={chartData} options={options} />
          </div>
        );
      case 'doughnut':
        return (
          <div style={{ height: chartHeight }}>
            <Doughnut
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    ...chartData.datasets[0],
                    backgroundColor: [
                      'rgba(33, 128, 141, 0.8)',
                      'rgba(50, 184, 198, 0.8)',
                      'rgba(98, 108, 113, 0.8)',
                      'rgba(192, 21, 47, 0.8)',
                      'rgba(168, 75, 47, 0.8)',
                      'rgba(94, 82, 64, 0.8)',
                    ],
                    borderColor: [
                      'rgba(33, 128, 141, 1)',
                      'rgba(50, 184, 198, 1)',
                      'rgba(98, 108, 113, 1)',
                      'rgba(192, 21, 47, 1)',
                      'rgba(168, 75, 47, 1)',
                      'rgba(94, 82, 64, 1)',
                    ],
                  },
                ],
              }}
              options={options}
            />
          </div>
        );
      case 'bar':
      default:
        return (
          <div style={{ height: chartHeight }}>
            <Bar data={chartData} options={options} />
          </div>
        );
    }
  };

  return (
    <Card title={title || 'Skill Analysis'} subtitle={subtitle || 'Current vs Required Skills'}>
      {renderChart()}
    </Card>
  );
};

export default SkillChart;
