import { Router, Request, Response } from 'express';

const router = Router();

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  priceAlerts: boolean;
  tradeConfirmations: boolean;
  dailyDigest: boolean;
  weeklyReport: boolean;
  marketNews: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

let preferences: NotificationPreferences = {
  email: true,
  push: true,
  sms: false,
  priceAlerts: true,
  tradeConfirmations: true,
  dailyDigest: true,
  weeklyReport: false,
  marketNews: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
};

router.get('/', (req: Request, res: Response) => {
  res.json({ preferences });
});

router.put('/', (req: Request, res: Response) => {
  const updates = req.body as Partial<NotificationPreferences>;
  preferences = { ...preferences, ...updates };
  res.json({ preferences });
});

export default router;
