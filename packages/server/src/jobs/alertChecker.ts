import { prisma } from '../config/database';
import { redis } from '../config/redis';

let alertInterval: NodeJS.Timeout | null = null;

export function startAlertChecker(): void {
  if (alertInterval) return;

  alertInterval = setInterval(checkAlerts, 30000);
  console.log('Alert checker started (30s interval)');
}

export function stopAlertChecker(): void {
  if (alertInterval) {
    clearInterval(alertInterval);
    alertInterval = null;
  }
}

async function checkAlerts(): Promise<void> {
  try {
    const activeAlerts = await prisma.alert.findMany({
      where: { active: true, triggered: false },
    });

    if (activeAlerts.length === 0) return;

    const symbols = [...new Set(activeAlerts.map((a) => a.symbol))];

    for (const symbol of symbols) {
      const cached = await redis.get(`sp:price:${symbol}`);
      if (!cached) continue;

      const priceData = JSON.parse(cached) as { price: number };
      const price = priceData.price;
      if (!price || price <= 0) continue;

      const symbolAlerts = activeAlerts.filter((a) => a.symbol === symbol);

      for (const alert of symbolAlerts) {
        let shouldTrigger = false;

        if (alert.condition === 'ABOVE' && price >= alert.targetPrice) {
          shouldTrigger = true;
        } else if (alert.condition === 'BELOW' && price <= alert.targetPrice) {
          shouldTrigger = true;
        }

        if (shouldTrigger) {
          await prisma.alert.update({
            where: { id: alert.id },
            data: { triggered: true, triggeredAt: new Date() },
          });

          await redis.publish('sp:alerts', JSON.stringify({
            alertId: alert.id,
            userId: alert.userId,
            symbol: alert.symbol,
            condition: alert.condition,
            targetPrice: alert.targetPrice,
            currentPrice: price,
          }));
        }
      }
    }
  } catch (err) {
    console.error('Alert checker error:', (err as Error).message);
  }
}
