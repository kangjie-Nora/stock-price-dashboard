import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { StockData } from '../types/stock';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockChartProps {
  stocks: StockData[];
}

export default function StockChart({ stocks }: StockChartProps) {
  if (stocks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No data available to display chart
      </div>
    );
  }

  // Sort stocks by price for chart display
  const sortedStocks = [...stocks].sort((a, b) => a.price - b.price);

  const data = {
    labels: sortedStocks.map((stock) => stock.symbol),
    datasets: [
      {
        label: 'Stock Price (USD)',
        data: sortedStocks.map((stock) => stock.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Price Comparison',
        font: {
          size: 16,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const stock = sortedStocks[context.dataIndex];
            return [
              `Price: $${context.parsed.y.toFixed(2)}`,
              `Change: ${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value: any) {
            return '$' + value.toFixed(2);
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

