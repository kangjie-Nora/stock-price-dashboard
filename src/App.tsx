import { useState, useEffect } from 'react';
import StockTable from './components/StockTable';
import StockChart from './components/StockChart';
import SearchBar from './components/SearchBar';
import { fetchStockQuote, fetchMultipleStockQuotes } from './services/stockApi';
import type { StockData } from './types/stock';

// Default stock symbols to display
const DEFAULT_STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];

function App() {
  // Load symbols from localStorage on mount
  const loadSymbolsFromStorage = () => {
    try {
      const saved = localStorage.getItem('stockDashboard_symbols');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load symbols from localStorage:', e);
    }
    return DEFAULT_STOCKS;
  };

  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symbols, setSymbols] = useState<string[]>(loadSymbolsFromStorage());
  const [showChart, setShowChart] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(30); // seconds

  // Load stock data
  const loadStocks = async (stockSymbols: string[]) => {
    if (stockSymbols.length === 0) {
      setStocks([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchMultipleStockQuotes(stockSymbols);
      if (data.length === 0) {
        setError('No stock data available. Please check your API key or try again later.');
      } else {
        setStocks(data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch stock data';
      setError(errorMessage);
      console.error('Failed to load stock data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Save symbols to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('stockDashboard_symbols', JSON.stringify(symbols));
    } catch (e) {
      console.error('Failed to save symbols to localStorage:', e);
    }
  }, [symbols]);

  // Initial load
  useEffect(() => {
    loadStocks(symbols);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || symbols.length === 0) return;

    const interval = setInterval(() => {
      if (symbols.length > 0) {
        loadStocks(symbols);
      }
    }, autoRefreshInterval * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, autoRefreshInterval, symbols.length]);

  // Add new stock
  const handleAddStock = async (symbol: string) => {
    if (symbols.includes(symbol)) {
      setError(`Stock ${symbol} is already in the list`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newStock = await fetchStockQuote(symbol);
      setStocks((prev) => [...prev, newStock]);
      setSymbols((prev) => [...prev, symbol]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : `Failed to add stock ${symbol}`;
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove stock
  const handleRemoveStock = (symbol: string) => {
    setStocks((prev) => prev.filter((stock) => stock.symbol !== symbol));
    setSymbols((prev) => prev.filter((s) => s !== symbol));
  };

  // Refresh data
  const handleRefresh = () => {
    loadStocks(symbols);
  };

  // Export data to CSV
  const handleExportCSV = () => {
    if (stocks.length === 0) return;

    const headers = ['Symbol', 'Price', 'Change', 'Change %', 'High', 'Low', 'Open', 'Previous Close'];
    const rows = stocks.map(stock => [
      stock.symbol,
      stock.price.toFixed(2),
      stock.change.toFixed(2),
      stock.changePercent.toFixed(2) + '%',
      stock.high.toFixed(2),
      stock.low.toFixed(2),
      stock.open.toFixed(2),
      stock.previousClose.toFixed(2),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `stock-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Stock Price Dashboard
          </h1>
          <p className="text-gray-600">Real-time stock prices and percentage changes</p>
        </header>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Search bar and action buttons */}
        <div className="mb-6">
          <SearchBar onSearch={handleAddStock} isLoading={isLoading} />
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={handleRefresh}
              disabled={isLoading || symbols.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <button
              onClick={() => setShowChart(!showChart)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showChart ? 'Hide Chart' : 'Show Chart'}
            </button>
            <button
              onClick={handleExportCSV}
              disabled={stocks.length === 0}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Export CSV
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Auto-refresh</span>
              </label>
              {autoRefresh && (
                <select
                  value={autoRefreshInterval}
                  onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>Every 10s</option>
                  <option value={30}>Every 30s</option>
                  <option value={60}>Every 1m</option>
                  <option value={120}>Every 2m</option>
                  <option value={300}>Every 5m</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Current stock list tags */}
        {symbols.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {symbols.map((symbol) => (
                <span
                  key={symbol}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {symbol}
                  <button
                    onClick={() => handleRemoveStock(symbol)}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                    disabled={isLoading}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chart */}
        {showChart && stocks.length > 0 && (
          <div className="mb-8">
            <StockChart stocks={stocks} />
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Stock Data Table
          </h2>
          <StockTable stocks={stocks} isLoading={isLoading} />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Data source: Yahoo Finance API (Real-time stock data, no API key required)
          </p>
          <p className="mt-2">
            Tip: Click column headers to sort, click stock symbol tags to remove stocks
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

