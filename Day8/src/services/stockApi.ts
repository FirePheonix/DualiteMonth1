import { QuoteData, ChartData, FinancialsData, ApiError, ChartResponse, ChartSettings } from '../types/stock';

const API_BASE_URL = 'https://yahoo-finance-real-time1.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

const headers = {
  'X-RapidAPI-Key': API_KEY || 'demo-key',
  'X-RapidAPI-Host': API_HOST || 'yahoo-finance-real-time1.p.rapidapi.com',
};

// Enhanced Quote Summary API Response Types
interface QuoteSummaryResponse {
  quoteSummary?: {
    result?: Array<{
      price?: {
        regularMarketPrice?: { raw?: number; fmt?: string };
        regularMarketChange?: { raw?: number; fmt?: string };
        regularMarketChangePercent?: { raw?: number; fmt?: string };
        regularMarketVolume?: { raw?: number; fmt?: string };
        regularMarketOpen?: { raw?: number; fmt?: string };
        regularMarketPreviousClose?: { raw?: number; fmt?: string };
        regularMarketDayHigh?: { raw?: number; fmt?: string };
        regularMarketDayLow?: { raw?: number; fmt?: string };
        marketCap?: { raw?: number; fmt?: string };
        shortName?: string;
        symbol?: string;
        longName?: string;
      };
      summaryDetail?: {
        regularMarketPrice?: { raw?: number; fmt?: string };
        regularMarketChange?: { raw?: number; fmt?: string };
        regularMarketChangePercent?: { raw?: number; fmt?: string };
        regularMarketVolume?: { raw?: number; fmt?: string };
        regularMarketOpen?: { raw?: number; fmt?: string };
        regularMarketPreviousClose?: { raw?: number; fmt?: string };
        regularMarketDayHigh?: { raw?: number; fmt?: string };
        regularMarketDayLow?: { raw?: number; fmt?: string };
        marketCap?: { raw?: number; fmt?: string };
        previousClose?: { raw?: number; fmt?: string };
        open?: { raw?: number; fmt?: string };
        dayLow?: { raw?: number; fmt?: string };
        dayHigh?: { raw?: number; fmt?: string };
        volume?: { raw?: number; fmt?: string };
      };
      quoteType?: {
        shortName?: string;
        symbol?: string;
        longName?: string;
      };
    }>;
    error?: any;
  };
  // Alternative response structure that might be used
  result?: Array<{
    regularMarketPrice?: number;
    regularMarketChange?: number;
    regularMarketChangePercent?: number;
    regularMarketVolume?: number;
    regularMarketOpen?: number;
    regularMarketPreviousClose?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    marketCap?: number;
    shortName?: string;
    symbol?: string;
    longName?: string;
  }>;
  error?: any;
}

export async function fetchQuote(symbol: string): Promise<QuoteData> {
  try {
    const url = `${API_BASE_URL}/stock/get-quote-summary?symbol=${symbol}&lang=en-US&region=US`;
    
    console.log('Fetching quote from:', url);
    console.log('Headers:', headers);
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: QuoteSummaryResponse = await response.json();
    
    // Debug: Log the entire response structure
    console.log('Full API Response:', JSON.stringify(data, null, 2));
    
    // Check for errors in the response
    if (data.quoteSummary?.error) {
      throw new Error(`Quote API Error: ${data.quoteSummary.error.description || 'Unknown error'}`);
    }
    
    if (data.error) {
      throw new Error(`API Error: ${data.error.description || data.error.message || 'Unknown error'}`);
    }

    // Helper function to safely extract numeric values
    const extractValue = (obj: any): number => {
      if (typeof obj === 'number') return obj;
      if (obj?.raw && typeof obj.raw === 'number') return obj.raw;
      if (obj?.fmt && typeof obj.fmt === 'string') {
        const parsed = parseFloat(obj.fmt.replace(/[,$%]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    // Helper function to safely extract string values
    const extractString = (obj: any): string => {
      if (typeof obj === 'string') return obj;
      if (obj?.fmt && typeof obj.fmt === 'string') return obj.fmt;
      return '';
    };

    let quoteData: QuoteData;

    // Try parsing quoteSummary structure first
    if (data.quoteSummary?.result && data.quoteSummary.result.length > 0) {
      const result = data.quoteSummary.result[0];
      const priceData = result.price;
      const summaryData = result.summaryDetail;
      const quoteTypeData = result.quoteType;

      console.log('Price data:', priceData);
      console.log('Summary data:', summaryData);
      console.log('Quote type data:', quoteTypeData);

      quoteData = {
        symbol: (priceData?.symbol || quoteTypeData?.symbol || symbol).toUpperCase(),
        regularMarketPrice: extractValue(priceData?.regularMarketPrice) || extractValue(summaryData?.regularMarketPrice),
        regularMarketChange: extractValue(priceData?.regularMarketChange) || extractValue(summaryData?.regularMarketChange),
        regularMarketChangePercent: extractValue(priceData?.regularMarketChangePercent) || extractValue(summaryData?.regularMarketChangePercent),
        regularMarketVolume: extractValue(priceData?.regularMarketVolume) || extractValue(summaryData?.regularMarketVolume) || extractValue(summaryData?.volume),
        regularMarketOpen: extractValue(priceData?.regularMarketOpen) || extractValue(summaryData?.regularMarketOpen) || extractValue(summaryData?.open),
        regularMarketPreviousClose: extractValue(priceData?.regularMarketPreviousClose) || extractValue(summaryData?.regularMarketPreviousClose) || extractValue(summaryData?.previousClose),
        regularMarketDayHigh: extractValue(priceData?.regularMarketDayHigh) || extractValue(summaryData?.regularMarketDayHigh) || extractValue(summaryData?.dayHigh),
        regularMarketDayLow: extractValue(priceData?.regularMarketDayLow) || extractValue(summaryData?.regularMarketDayLow) || extractValue(summaryData?.dayLow),
        marketCap: extractValue(priceData?.marketCap) || extractValue(summaryData?.marketCap),
        shortName: priceData?.shortName || priceData?.longName || quoteTypeData?.shortName || quoteTypeData?.longName || `${symbol.toUpperCase()} Inc.`
      };
    }
    // Try alternative response structure
    else if (data.result && data.result.length > 0) {
      const result = data.result[0];
      console.log('Alternative structure result:', result);

      quoteData = {
        symbol: (result.symbol || symbol).toUpperCase(),
        regularMarketPrice: result.regularMarketPrice || 0,
        regularMarketChange: result.regularMarketChange || 0,
        regularMarketChangePercent: result.regularMarketChangePercent || 0,
        regularMarketVolume: result.regularMarketVolume || 0,
        regularMarketOpen: result.regularMarketOpen || 0,
        regularMarketPreviousClose: result.regularMarketPreviousClose || 0,
        regularMarketDayHigh: result.regularMarketDayHigh || 0,
        regularMarketDayLow: result.regularMarketDayLow || 0,
        marketCap: result.marketCap || 0,
        shortName: result.shortName || result.longName || `${symbol.toUpperCase()} Inc.`
      };
    }
    // If no data structure matches, try to extract any available data
    else {
      console.log('No recognized data structure found. Full response:', data);
      
      // Look for any price data anywhere in the response
      const findInObject = (obj: any, key: string): any => {
        if (obj && typeof obj === 'object') {
          if (obj[key] !== undefined) return obj[key];
          for (const prop in obj) {
            const result = findInObject(obj[prop], key);
            if (result !== undefined) return result;
          }
        }
        return undefined;
      };

      quoteData = {
        symbol: symbol.toUpperCase(),
        regularMarketPrice: extractValue(findInObject(data, 'regularMarketPrice')),
        regularMarketChange: extractValue(findInObject(data, 'regularMarketChange')),
        regularMarketChangePercent: extractValue(findInObject(data, 'regularMarketChangePercent')),
        regularMarketVolume: extractValue(findInObject(data, 'regularMarketVolume')),
        regularMarketOpen: extractValue(findInObject(data, 'regularMarketOpen')),
        regularMarketPreviousClose: extractValue(findInObject(data, 'regularMarketPreviousClose')),
        regularMarketDayHigh: extractValue(findInObject(data, 'regularMarketDayHigh')),
        regularMarketDayLow: extractValue(findInObject(data, 'regularMarketDayLow')),
        marketCap: extractValue(findInObject(data, 'marketCap')),
        shortName: `${symbol.toUpperCase()} Inc.`
      };
    }

    console.log('Parsed quote data:', quoteData);

    // Validate that we got some meaningful data
    if (quoteData.regularMarketPrice === 0 && quoteData.marketCap === 0) {
      console.warn('All parsed values are 0, this might indicate a parsing issue');
      throw new Error('No valid quote data found in API response. Check if the symbol is correct and the API key is valid.');
    }

    return quoteData;
  } catch (error) {
    console.error('Quote API Error:', error);
    
    // Enhanced error message
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error('Invalid API key or unauthorized access. Please check your RapidAPI key.');
      }
      if (error.message.includes('404')) {
        throw new Error(`Stock symbol "${symbol}" not found. Please verify the symbol is correct.`);
      }
      if (error.message.includes('429')) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
    }
    
    // Fallback to mock data for demo purposes
    console.warn('Using mock data for demo purposes');
    
    return {
      symbol: symbol.toUpperCase(),
      regularMarketPrice: 175.43 + Math.random() * 10,
      regularMarketChange: (Math.random() - 0.5) * 10,
      regularMarketChangePercent: (Math.random() - 0.5) * 5,
      regularMarketVolume: Math.floor(Math.random() * 100000000),
      regularMarketOpen: 170.25 + Math.random() * 10,
      regularMarketPreviousClose: 173.50 + Math.random() * 10,
      regularMarketDayHigh: 180.75 + Math.random() * 5,
      regularMarketDayLow: 165.30 + Math.random() * 5,
      marketCap: Math.floor(Math.random() * 3000000000000),
      shortName: `${symbol.toUpperCase()} Inc.`
    };
  }
}

export async function fetchChart(symbol: string, settings: ChartSettings): Promise<ChartData> {
  try {
    const { interval, range } = settings;
    const url = `${API_BASE_URL}/stock/get-chart?symbol=${symbol}&region=US&lang=en-US&useYfid=true&includeAdjustedClose=true&events=div%2Csplit%2Cearn&range=${range}&interval=${interval}&includePrePost=false`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chart: ${response.statusText}`);
    }

    const data: ChartResponse = await response.json();
    
    if (data.chart.error) {
      throw new Error(`Chart API Error: ${data.chart.error.description || 'Unknown error'}`);
    }

    if (!data.chart.result || data.chart.result.length === 0) {
      throw new Error('No chart data available for this symbol');
    }

    const result = data.chart.result[0];
    const quote = result.indicators.quote[0];

    // Filter out null values and align arrays
    const validIndices: number[] = [];
    const timestamps: number[] = [];
    const closes: number[] = [];
    const volumes: number[] = [];
    const highs: number[] = [];
    const lows: number[] = [];
    const opens: number[] = [];

    result.timestamp.forEach((timestamp, index) => {
      if (
        quote.close[index] !== null &&
        quote.volume[index] !== null &&
        quote.high[index] !== null &&
        quote.low[index] !== null &&
        quote.open[index] !== null
      ) {
        timestamps.push(timestamp * 1000); // Convert to milliseconds
        closes.push(quote.close[index] as number);
        volumes.push(quote.volume[index] as number);
        highs.push(quote.high[index] as number);
        lows.push(quote.low[index] as number);
        opens.push(quote.open[index] as number);
      }
    });

    return {
      timestamp: timestamps,
      close: closes,
      volume: volumes,
      high: highs,
      low: lows,
      open: opens,
      meta: result.meta
    };
  } catch (error) {
    // Fallback to mock data if API fails (for demo purposes)
    console.warn('Chart API failed, using mock data:', error);
    
    const now = Date.now();
    const points = range === '1d' ? 390 : range === '5d' ? 1950 : 100; // Market hours
    const timestamps: number[] = [];
    const prices: number[] = [];
    const volumes: number[] = [];
    const highs: number[] = [];
    const lows: number[] = [];
    const opens: number[] = [];
    
    let basePrice = 175 + Math.random() * 20;
    
    for (let i = 0; i < points; i++) {
      const intervalMs = interval === '1m' ? 60000 : interval === '5m' ? 300000 : 3600000;
      timestamps.push(now - (points - i) * intervalMs);
      
      const change = (Math.random() - 0.5) * 2;
      basePrice += change;
      basePrice = Math.max(basePrice, 1);
      
      const open = basePrice - change;
      const high = Math.max(open, basePrice) + Math.random() * 1;
      const low = Math.min(open, basePrice) - Math.random() * 1;
      
      opens.push(open);
      highs.push(high);
      lows.push(low);
      prices.push(basePrice);
      volumes.push(Math.floor(Math.random() * 1000000));
    }

    return {
      timestamp: timestamps,
      close: prices,
      volume: volumes,
      high: highs,
      low: lows,
      open: opens,
      meta: {
        currency: 'USD',
        symbol: symbol.toUpperCase(),
        exchangeName: 'NASDAQ',
        instrumentType: 'EQUITY',
        firstTradeDate: Date.now() - 86400000,
        regularMarketTime: Date.now(),
        gmtoffset: -18000,
        timezone: 'EST',
        exchangeTimezoneName: 'America/New_York',
        regularMarketPrice: basePrice,
        chartPreviousClose: basePrice - 2,
        priceHint: 2,
        currentTradingPeriod: {
          pre: { timezone: 'EST', start: 0, end: 0, gmtoffset: -18000 },
          regular: { timezone: 'EST', start: 0, end: 0, gmtoffset: -18000 },
          post: { timezone: 'EST', start: 0, end: 0, gmtoffset: -18000 }
        },
        dataGranularity: interval,
        range: range,
        validRanges: ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max']
      }
    };
  }
}

export async function fetchFinancials(symbol: string): Promise<FinancialsData> {
  try {
    const response = await fetch(`${API_BASE_URL}/stock/get-financials?symbol=${symbol}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch financials: ${response.statusText}`);
    }

    // Mock financial data - replace with actual API response parsing
    return {
      totalRevenue: Math.floor(Math.random() * 500000000000),
      totalDebt: Math.floor(Math.random() * 100000000000),
      totalCash: Math.floor(Math.random() * 200000000000),
      ebitda: Math.floor(Math.random() * 100000000000),
      grossProfits: Math.floor(Math.random() * 150000000000),
      freeCashflow: Math.floor(Math.random() * 80000000000)
    };
  } catch (error) {
    throw new Error(`Financials API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
