# Stock Price Dashboard

A modern stock price monitoring dashboard built with React, TypeScript, and Tailwind CSS.

## Features

### Core Features ✅
- ✅ Stock data table display (symbol, price, percentage change)
- ✅ Responsive design using Tailwind CSS
- ✅ Real-time data fetching (Yahoo Finance API)

### Additional Features 🎁
- ✅ Loading state indicator (spinner animation)
- ✅ Complete error handling (API failures, invalid stock symbols, etc.)
- ✅ Search functionality (add new stocks to watchlist)
- ✅ Table sorting (click column headers to sort by symbol, price, or percentage change)
- ✅ Interactive charts (price comparison using Chart.js)
- ✅ Refresh data functionality
- ✅ Remove stock functionality (click × button on stock tags)
- ✅ **Auto-refresh feature** (configurable intervals: 10s, 30s, 1m, 2m, 5m)
- ✅ **Local storage** (automatically saves stock list to browser localStorage)
- ✅ **Data export** (export to CSV format)
- ✅ **Price trend indicators** (up/down arrow icons)
- ✅ Beautiful user interface and smooth interactions

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Charting library
- **Yahoo Finance API** - Free stock data API (no API key required)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Project

The project uses **Yahoo Finance API** to fetch real stock data. **No API key configuration needed**. Just run:

```bash
npm run dev
```

**Data Notes**:
- Uses Yahoo Finance public API, no registration or API key required
- Fetches real-time stock data
- Falls back to built-in demo data if API call fails

### 3. Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## Usage

1. **View default stocks**: The app automatically loads data for AAPL, GOOGL, MSFT, TSLA, AMZN on startup
2. **Add new stock**: Enter a stock symbol (e.g., AAPL, TSLA) in the search box and click "Add"
3. **Sort table**: Click column headers (Symbol, Price, Change %) to sort, click again to toggle ascending/descending
4. **View chart**: The chart automatically displays price comparison for all current stocks. Toggle with "Hide Chart"/"Show Chart" button
5. **Refresh data**: Click "Refresh Data" button to get latest prices
6. **Remove stock**: Click the × button on stock symbol tags to remove stocks

## API Notes

Yahoo Finance API (free, public API):
- No API key required
- Real-time stock data
- Rate limits may apply for high-frequency requests

## Project Structure

```
stock-price-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── StockTable.tsx   # Stock data table
│   │   ├── StockChart.tsx   # Price chart
│   │   └── SearchBar.tsx    # Search input
│   ├── services/            # API services
│   │   └── stockApi.ts      # Stock data fetching logic
│   ├── types/               # TypeScript type definitions
│   │   └── stock.ts         # Stock data types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

## License

MIT License

## Author

Kangjie

---

**Note**: This project is for demonstration and learning purposes only. Stock data is for reference only and does not constitute investment advice.
