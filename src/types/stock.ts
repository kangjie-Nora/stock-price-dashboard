export interface StockQuote {
  symbol: string;
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high price
  l: number; // low price
  o: number; // open price
  pc: number; // previous close price
  t: number; // timestamp
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

