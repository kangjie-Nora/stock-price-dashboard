import type { StockData } from '../types/stock';

// Yahoo Finance API (no API key required, free public API)
const YAHOO_FINANCE_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

// Fallback: Mock data for demonstration (only used if API fails completely)
const MOCK_DATA: Record<string, StockData> = {
  AAPL: {
    symbol: 'AAPL',
    price: 185.59,
    change: 2.34,
    changePercent: 1.28,
    high: 186.50,
    low: 183.20,
    open: 184.10,
    previousClose: 183.25,
  },
  GOOGL: {
    symbol: 'GOOGL',
    price: 142.83,
    change: -1.25,
    changePercent: -0.87,
    high: 144.20,
    low: 142.10,
    open: 144.08,
    previousClose: 144.08,
  },
  MSFT: {
    symbol: 'MSFT',
    price: 378.85,
    change: 5.12,
    changePercent: 1.37,
    high: 379.50,
    low: 374.20,
    open: 375.30,
    previousClose: 373.73,
  },
  TSLA: {
    symbol: 'TSLA',
    price: 248.42,
    change: 8.76,
    changePercent: 3.66,
    high: 250.80,
    low: 240.50,
    open: 241.20,
    previousClose: 239.66,
  },
  AMZN: {
    symbol: 'AMZN',
    price: 151.94,
    change: 1.45,
    changePercent: 0.96,
    high: 152.80,
    low: 150.30,
    open: 151.20,
    previousClose: 150.49,
  },
};

/**
 * Get mock data as last resort fallback
 */
function getMockData(symbol: string): StockData | null {
  const upperSymbol = symbol.toUpperCase();
  return MOCK_DATA[upperSymbol] || null;
}

/**
 * Fetch stock quote from Yahoo Finance API (no API key required)
 */
export async function fetchStockQuote(symbol: string): Promise<StockData> {
  const upperSymbol = symbol.toUpperCase();

  try {
    const response = await fetch(
      `${YAHOO_FINANCE_BASE_URL}/${upperSymbol}?interval=1d&range=1d`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: any = await response.json();

    // Check if we got valid data
    if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
      throw new Error(`No data available for ${upperSymbol}`);
    }

    const result = data.chart.result[0];
    const meta = result.meta;
    const quote = result.indicators?.quote?.[0];

    if (!meta) {
      throw new Error(`Invalid data format for ${upperSymbol}`);
    }

    // Get current price (regularMarketPrice or regularMarketPreviousClose + change)
    const currentPrice = meta.regularMarketPrice || meta.previousClose || 0;
    const previousClose = meta.previousClose || currentPrice;
    const change = currentPrice - previousClose;
    const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;

    // Get high/low/open from quote array or meta
    const high = meta.regularMarketDayHigh || quote?.high?.[quote.high.length - 1] || currentPrice;
    const low = meta.regularMarketDayLow || quote?.low?.[quote.low.length - 1] || currentPrice;
    const open = meta.regularMarketOpen || quote?.open?.[quote.open.length - 1] || previousClose;

    return {
      symbol: upperSymbol,
      price: Math.round(currentPrice * 100) / 100, // Round to 2 decimals
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      open: Math.round(open * 100) / 100,
      previousClose: Math.round(previousClose * 100) / 100,
    };
  } catch (error) {
    // Last resort: try mock data if available
    const mockData = getMockData(upperSymbol);
    if (mockData) {
      console.warn(`Yahoo Finance API error for ${upperSymbol}, using mock data:`, error);
      return mockData;
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch data for ${upperSymbol}: ${error.message}`);
    }
    throw new Error(`An unknown error occurred while fetching stock data for ${upperSymbol}`);
  }
}

/**
 * Fetch multiple stock quotes from Yahoo Finance API
 */
export async function fetchMultipleStockQuotes(
  symbols: string[]
): Promise<StockData[]> {
  try {
    // Fetch all stocks in parallel (Yahoo Finance allows this)
    const promises = symbols.map((symbol) => fetchStockQuote(symbol));
    const results = await Promise.allSettled(promises);

    return results
      .map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error(`Failed to fetch data for ${symbols[index]}:`, result.reason);
          // Try mock data as last resort
          const mockData = getMockData(symbols[index]);
          return mockData;
        }
      })
      .filter((data): data is StockData => data !== null && data.price > 0);
  } catch (error) {
    console.error('Failed to fetch multiple stock quotes:', error);
    throw error;
  }
}
