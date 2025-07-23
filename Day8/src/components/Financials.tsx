import React from 'react';
import { FinancialsData } from '../types/stock';
import LoadingSpinner from './LoadingSpinner';
import { DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

interface FinancialsProps {
  data: FinancialsData | null;
  loading: boolean;
  error: string | null;
}

const Financials: React.FC<FinancialsProps> = ({ data, loading, error }) => {
  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
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
        <p className="text-gray-400 text-center">Enter a stock symbol to view financial data</p>
      </div>
    );
  }

  const financialItems = [
    {
      label: 'Total Revenue',
      value: data.totalRevenue,
      icon: <DollarSign className="text-green-400" size={20} />,
      color: 'text-green-400'
    },
    {
      label: 'EBITDA',
      value: data.ebitda,
      icon: <TrendingUp className="text-blue-400" size={20} />,
      color: 'text-blue-400'
    },
    {
      label: 'Gross Profits',
      value: data.grossProfits,
      icon: <BarChart3 className="text-purple-400" size={20} />,
      color: 'text-purple-400'
    },
    {
      label: 'Free Cash Flow',
      value: data.freeCashflow,
      icon: <DollarSign className="text-emerald-400" size={20} />,
      color: 'text-emerald-400'
    },
    {
      label: 'Total Cash',
      value: data.totalCash,
      icon: <DollarSign className="text-yellow-400" size={20} />,
      color: 'text-yellow-400'
    },
    {
      label: 'Total Debt',
      value: data.totalDebt,
      icon: <BarChart3 className="text-red-400" size={20} />,
      color: 'text-red-400'
    }
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-6">Financial Overview</h2>
      
      <div className="space-y-4">
        {financialItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-gray-300 font-medium">{item.label}</span>
            </div>
            <span className={`font-bold ${item.color}`}>
              {formatLargeNumber(item.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Key Ratios</h3>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Debt-to-Cash Ratio</span>
            <span className="text-white font-semibold">
              {(data.totalDebt / data.totalCash).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">FCF-to-Revenue Ratio</span>
            <span className="text-white font-semibold">
              {((data.freeCashflow / data.totalRevenue) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
