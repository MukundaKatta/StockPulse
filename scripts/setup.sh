#!/bin/bash
set -e

echo "========================================"
echo "  StockPulse Setup"
echo "========================================"
echo ""

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    echo "https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo "Error: Docker Compose is not installed."
    exit 1
fi

echo "Docker found!"

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo ""
    echo "Please edit .env and add your API keys:"
    echo "  - Alpha Vantage: https://www.alphavantage.co/support/#api-key"
    echo "  - Finnhub: https://finnhub.io/register"
    echo "  - FMP: https://financialmodelingprep.com/developer"
    echo ""
fi

# Start services
echo "Starting PostgreSQL and Redis..."
docker compose up -d db redis

echo "Waiting for database to be ready..."
sleep 3

# Install dependencies
echo "Installing server dependencies..."
cd packages/server
npm install
npx prisma generate
npx prisma db push

echo ""
echo "Installing web dependencies..."
cd ../web
npm install

cd ../..

# Seed database
echo ""
echo "Seeding database..."
cd packages/server
npx tsx ../scripts/seed.ts
cd ../..

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo "  Terminal 1: cd packages/server && npm run dev"
echo "  Terminal 2: cd packages/web && npm run dev"
echo ""
echo "Or use Docker:"
echo "  docker compose up"
echo ""
echo "Open http://localhost:3000"
echo ""
echo "Demo login:"
echo "  Email: demo@stockpulse.dev"
echo "  Password: stockpulse123"
