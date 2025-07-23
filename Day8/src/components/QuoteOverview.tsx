import React from 'react';
import { QuoteData } from '../types/stock';
import LoadingSpinner from './LoadingSpinner';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface QuoteOverviewProps {
  data: QuoteData | null;
  loading: boolean;
  error: string | null;
}

const QuoteOverview: React.FC<QuoteOverviewProps> = ({ data, loading, error }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 h-full flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 h-full flex items-center justify-center">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-400 text-center">Enter a stock symbol to view quote data</p>
      </div>
    );
  }

  const isPositive = data.regularMarketChange >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-gray-900 rounded-lg p-6 h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">Quote Overview</h2>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-2xl font-bold text-white">{data.symbol}</h3>
          {isPositive ? <TrendingUp className="text-green-400" size={20} /> : <TrendingDown className="text-red-400" size={20} />}
        </div>
        <p className="text-gray-400">{data.shortName}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-white">{formatCurrency(data.regularMarketPrice)}</span>
          <span className={`text-lg ${changeColor}`}>
            {isPositive ? '+' : ''}{formatCurrency(data.regularMarketChange)} ({data.regularMarketChangePercent.toFixed(2)}%)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Open</p>
            <p className="text-white font-semibold">{formatCurrency(data.regularMarketOpen)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Previous Close</p>
            <p className="text-white font-semibold">{formatCurrency(data.regularMarketPreviousClose)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Day High</p>
            <p className="text-white font-semibold">{formatCurrency(data.regularMarketDayHigh)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Day Low</p>
            <p className="text-white font-semibold">{formatCurrency(data.regularMarketDayLow)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Volume</p>
            <p className="text-white font-semibold">{data.regularMarketVolume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Market Cap</p>
            <p className="text-white font-semibold">{formatLargeNumber(data.marketCap)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteOverview;
