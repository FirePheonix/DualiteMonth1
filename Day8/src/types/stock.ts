export interface QuoteData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketVolume: number;
  regularMarketOpen: number;
  regularMarketPreviousClose: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  marketCap: number;
  shortName: string;
}

export interface ChartMeta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  priceHint: number;
  currentTradingPeriod: {
    pre: {
      timezone: string;
      start: number;
      end: number;
      gmtoffset: number;
    };
    regular: {
      timezone: string;
      start: number;
      end: number;
      gmtoffset: number;
    };
    post: {
      timezone: string;
      start: number;
      end: number;
      gmtoffset: number;
    };
  };
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface ChartIndicators {
  quote: Array<{
    volume: (number | null)[];
    high: (number | null)[];
    close: (number | null)[];
    low: (number | null)[];
    open: (number | null)[];
  }>;
}

export interface ChartResult {
  meta: ChartMeta;
  timestamp: number[];
  indicators: ChartIndicators;
}

export interface ChartResponse {
  chart: {
    result: ChartResult[];
    error: any;
  };
}

export interface ChartData {
  timestamp: number[];
  close: number[];
  volume: number[];
  high: number[];
  low: number[];
  open: number[];
  meta: ChartMeta;
}

export interface FinancialsData {
  totalRevenue: number;
  totalDebt: number;
  totalCash: number;
  ebitda: number;
  grossProfits: number;
  freeCashflow: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ChartSettings {
  interval: string;
  range: string;
}
