import React, { useState, useEffect, useCallback } from 'react';
import { QuoteData, FinancialsData } from './types/stock';
import { fetchQuote, fetchFinancials } from './services/stockApi';
import SearchBar from './components/SearchBar';
import QuoteOverview from './components/QuoteOverview';
import StockChart from './components/StockChart';
import Financials from './components/Financials';
import { Activity } from 'lucide-react';

function App() {
  const [currentSymbol, setCurrentSymbol] = useState<string>('');
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [financialsData, setFinancialsData] = useState<FinancialsData | null>(null);
  
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [financialsLoading, setFinancialsLoading] = useState(false);
  
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [financialsError, setFinancialsError] = useState<string | null>(null);

  const loadStockData = useCallback(async (symbol: string) => {
    setCurrentSymbol(symbol);
    
    // Reset errors
    setQuoteError(null);
    setFinancialsError(null);
    
    // Fetch quote data
    setQuoteLoading(true);
    try {
      const quote = await fetchQuote(symbol);
      setQuoteData(quote);
    } catch (error) {
      setQuoteError(error instanceof Error ? error.message : 'Failed to fetch quote data');
    } finally {
      setQuoteLoading(false);
    }
    
    // Fetch financials data
    setFinancialsLoading(true);
    try {
      const financials = await fetchFinancials(symbol);
      setFinancialsData(financials);
    } catch (error) {
      setFinancialsError(error instanceof Error ? error.message : 'Failed to fetch financial data');
    } finally {
      setFinancialsLoading(false);
    }
  }, []);

  const isLoading = quoteLoading || financialsLoading;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-blue-400" size={32} />
            <h1 className="text-2xl font-bold text-white">Stock Pulse</h1>
          </div>
          <div className="text-sm text-gray-400">
            Real-time Stock Market Data
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={loadStockData} loading={isLoading} />
        </div>
      </section>

      {/* Main Content */}
      <main className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Chart Section - Full Width */}
          <div className="mb-8">
            <div className="w-full h-[500px] md:h-[650px]">
              <StockChart symbol={currentSymbol} />
            </div>
          </div>
          
          {/* Quote and Financials Section - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quote Overview */}
            <div className="h-[500px]">
              <QuoteOverview 
                data={quoteData} 
                loading={quoteLoading} 
                error={quoteError} 
              />
            </div>
            
            {/* Financials */}
            <div className="h-[500px]">
              <Financials 
                data={financialsData} 
                loading={financialsLoading} 
                error={financialsError} 
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-4 px-6 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>Stock Pulse - Powered by Yahoo Finance Real-Time API via RapidAPI</p>
          <p className="mt-1">
            {currentSymbol && (
              <span>
                Current Symbol: {currentSymbol} | Auto-refresh: 60s (intraday only)
              </span>
            )}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
