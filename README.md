# StockPulse

Institutional-grade stock analysis web application with real-time price tracking, technical indicators, fundamental analysis, and portfolio management.

## Features

- **Real-Time Price Tracking** — WebSocket-powered live price updates with Finnhub integration
- **Technical Indicators** — RSI, MACD, SMA, EMA, Bollinger Bands, VWAP with interactive charts
- **Signal Summary** — Automated BUY/HOLD/SELL signals based on technical analysis
- **Fundamental Analysis** — P/E, EPS, revenue trends, margins, and key financial metrics
- **Portfolio Management** — Track trades, holdings, allocation, and performance
- **Watchlists** — Multiple watchlists with real-time price updates
- **Candlestick Charts** — TradingView Lightweight Charts with volume overlay
- **Command Palette** — Cmd+K instant stock search with fuzzy matching
- **Dark Terminal UI** — Bloomberg-inspired design with modern UX

## Tech Stack

**Backend:** Node.js, Express, TypeScript, PostgreSQL, Prisma, Redis, Socket.IO, Zod
**Frontend:** Next.js 14, React, TanStack Query, Zustand, TradingView Charts, Recharts, Tailwind CSS, Framer Motion
**Data Sources:** Alpha Vantage, Finnhub, Financial Modeling Prep

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+
- API keys (free tiers):
  - [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
  - [Finnhub](https://finnhub.io/register)
  - [Financial Modeling Prep](https://financialmodelingprep.com/developer)

### Setup

```bash
# Clone and setup
cp .env.example .env
# Edit .env with your API keys

# Start infrastructure
docker compose up -d db redis

# Install & run server
cd packages/server
npm install
npx prisma generate
npx prisma db push
npx tsx ../scripts/seed.ts
npm run dev

# Install & run frontend (new terminal)
cd packages/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo login:** `demo@stockpulse.dev` / `stockpulse123`

### Docker (Full Stack)

```bash
cp .env.example .env
docker compose up
```

## Project Structure

```
packages/
├── server/          # Express API server
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Alpha Vantage, Finnhub, FMP clients
│   │   ├── jobs/        # Cron jobs for polling
│   │   ├── websocket/   # Socket.IO price streaming
│   │   ├── middleware/   # Auth, rate limiting, error handling
│   │   └── utils/       # Technical indicator calculations
│   └── prisma/          # Database schema & migrations
└── web/             # Next.js frontend
    └── src/
        ├── app/         # Pages (dashboard, stock, portfolio, screener)
        ├── components/  # UI components (charts, stock, portfolio)
        ├── hooks/       # React Query hooks, WebSocket hooks
        ├── stores/      # Zustand state stores
        └── lib/         # API client, formatters, constants
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/stocks/search?q=` | Search stocks |
| GET | `/api/stocks/:symbol/quote` | Get stock quote |
| GET | `/api/stocks/:symbol/history` | Price history |
| GET | `/api/stocks/:symbol/indicators` | Technical indicators |
| GET | `/api/stocks/:symbol/fundamentals` | Fundamental data |
| GET | `/api/stocks/:symbol/news` | Company news |
| GET/POST | `/api/portfolio` | Portfolio CRUD |
| GET/POST | `/api/watchlist` | Watchlist CRUD |
| GET | `/api/health` | Health check |

## License

MIT
