import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo user
  const passwordHash = await bcrypt.hash('stockpulse123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'demo@stockpulse.dev' },
    update: {},
    create: {
      email: 'demo@stockpulse.dev',
      passwordHash,
      name: 'Demo User',
    },
  });

  // Create settings
  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id, theme: 'dark' },
  });

  // Create portfolio with sample trades
  const portfolio = await prisma.portfolio.create({
    data: {
      userId: user.id,
      name: 'My Portfolio',
      trades: {
        create: [
          { symbol: 'AAPL', type: 'BUY', quantity: 50, price: 178.50, fee: 4.99, date: new Date('2024-01-15') },
          { symbol: 'MSFT', type: 'BUY', quantity: 30, price: 375.00, fee: 4.99, date: new Date('2024-02-01') },
          { symbol: 'GOOGL', type: 'BUY', quantity: 25, price: 142.00, fee: 4.99, date: new Date('2024-02-15') },
          { symbol: 'NVDA', type: 'BUY', quantity: 20, price: 620.00, fee: 4.99, date: new Date('2024-03-01') },
          { symbol: 'AMZN', type: 'BUY', quantity: 40, price: 175.50, fee: 4.99, date: new Date('2024-03-15') },
          { symbol: 'TSLA', type: 'BUY', quantity: 15, price: 195.00, fee: 4.99, date: new Date('2024-04-01') },
        ],
      },
    },
  });

  // Create watchlist
  const watchlist = await prisma.watchlist.create({
    data: {
      userId: user.id,
      name: 'My Watchlist',
      items: {
        create: [
          { symbol: 'AAPL' },
          { symbol: 'MSFT' },
          { symbol: 'GOOGL' },
          { symbol: 'NVDA' },
          { symbol: 'AMZN' },
          { symbol: 'TSLA' },
          { symbol: 'META' },
          { symbol: 'NFLX' },
        ],
      },
    },
  });

  console.log(`Created user: ${user.email}`);
  console.log(`Created portfolio: ${portfolio.name} with 6 trades`);
  console.log(`Created watchlist: ${watchlist.name} with 8 items`);
  console.log('\nDemo credentials:');
  console.log('  Email: demo@stockpulse.dev');
  console.log('  Password: stockpulse123');
  console.log('\nSeeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
