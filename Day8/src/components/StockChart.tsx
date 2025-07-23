import React, { useState, useRef, useEffect } from 'react';
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
import { Line } from 'react-chartjs-2';
import { ChartData, ChartSettings } from '../types/stock';
import { fetchChart } from '../services/stockApi';
import LoadingSpinner from './LoadingSpinner';
import { RefreshCw, TrendingUp, Volume2 } from 'lucide-react';

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
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<ChartSettings>({
    interval: '1m',
    range: '1d'
  });
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const chartRef = useRef<ChartJS<'line'>>(null);

  const intervalOptions = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '1d', label: '1 Day' }
  ];

  const rangeOptions = [
    { value: '1d', label: '1 Day' },
    { value: '5d', label: '5 Days' },
    { value: '1mo', label: '1 Month' },
    { value: '3mo', label: '3 Months' },
    { value: '6mo', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: '2y', label: '2 Years' }
  ];

  const loadChartData = async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const chartData = await fetchChart(symbol, settings);
      setData(chartData);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
    } finally {
      setLoading(false);
    }
  };

  // Load data when symbol or settings change
  useEffect(() => {
    loadChartData();
  }, [symbol, settings]);

  // Auto-refresh every 60 seconds for intraday intervals
  useEffect(() => {
    if (!symbol || !['1m', '5m', '15m'].includes(settings.interval)) return;

    const interval = setInterval(() => {
      loadChartData();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [symbol, settings]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    if (settings.range === '1d') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatVolume = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toString();
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return `Price: ${formatCurrency(context.parsed.y)}`;
          },
          afterLabel: function(context: any) {
            const index = context.dataIndex;
            const volume = data?.volume[index];
            return volume ? `Volume: ${formatVolume(volume)}` : '';
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: '#9CA3AF',
          maxTicksLimit: 8,
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          lineWidth: 1,
        },
      },
      y: {
        display: true,
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return formatCurrency(value);
          },
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          lineWidth: 1,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
      line: {
        tension: 0.1,
        borderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const getCurrentPrice = () => {
    if (!data || data.close.length === 0) return null;
    return data.close[data.close.length - 1];
  };

  const getPriceChange = () => {
    if (!data || data.close.length < 2) return { change: 0, percentage: 0 };
    const current = data.close[data.close.length - 1];
    const previous = data.meta.chartPreviousClose;
    const change = current - previous;
    const percentage = (change / previous) * 100;
    return { change, percentage };
  };

  const getTodaysHighLow = () => {
    if (!data || data.high.length === 0) return { high: 0, low: 0 };
    return {
      high: Math.max(...data.high),
      low: Math.min(...data.low)
    };
  };

  if (!symbol) {
    return (
      <div className="bg-gray-900 rounded-xl p-8 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-gray-400 text-xl mb-2">Ready to analyze stocks</p>
          <p className="text-gray-500">Enter a stock symbol above to view live chart data</p>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const { change, percentage } = getPriceChange();
  const { high, low } = getTodaysHighLow();
  const isPositive = change >= 0;

  const chartData = data ? {
    labels: data.timestamp.map(formatTime),
    datasets: [
      {
        label: `${symbol} Price`,
        data: data.close,
        borderColor: isPositive ? '#10B981' : '#EF4444',
        backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: isPositive ? '#10B981' : '#EF4444',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: isPositive ? '#10B981' : '#EF4444',
      },
    ],
  } : null;

  return (
    <div className="bg-gray-900 rounded-xl p-6 h-full shadow-2xl border border-gray-800">
      {/* Header with controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {symbol} - Live Chart
          </h2>
          {currentPrice && (
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-white">
                {formatCurrency(currentPrice)}
              </span>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                <TrendingUp size={16} className={isPositive ? '' : 'rotate-180'} />
                <span className="font-semibold">
                  {isPositive ? '+' : ''}{formatCurrency(change)} ({percentage.toFixed(2)}%)
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={settings.interval}
            onChange={(e) => setSettings(prev => ({ ...prev, interval: e.target.value }))}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {intervalOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={settings.range}
            onChange={(e) => setSettings(prev => ({ ...prev, range: e.target.value }))}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {rangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={loadChartData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Price info bar */}
      {data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
          <div>
            <p className="text-gray-400 text-sm">Day High</p>
            <p className="text-white font-semibold">{formatCurrency(high)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Day Low</p>
            <p className="text-white font-semibold">{formatCurrency(low)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Previous Close</p>
            <p className="text-white font-semibold">{formatCurrency(data.meta.chartPreviousClose)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Volume</p>
              <p className="text-white font-semibold">
                {data.volume.length > 0 ? formatVolume(data.volume.reduce((a, b) => a + b, 0)) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart area */}
      <div className="h-96">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 mt-4 text-lg">Loading chart data...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-400 text-lg mb-2">Chart Error</p>
              <p className="text-gray-400">{error}</p>
            </div>
          </div>
        ) : chartData ? (
          <Line ref={chartRef} data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No chart data available</p>
          </div>
        )}
      </div>

      {/* Footer info */}
      {lastRefresh && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          {['1m', '5m', '15m'].includes(settings.interval) && (
            <span>Auto-refresh: 60s</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StockChart;
