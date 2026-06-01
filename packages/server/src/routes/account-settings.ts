import { Router, Request, Response } from 'express';

const router = Router();

interface AccountSettings {
  userId: string;
  displayName: string;
  email: string;
  timezone: string;
  locale: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const settingsStore = new Map<string, AccountSettings>();

// Get account settings
router.get('/', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const settings = settingsStore.get(userId);

  if (!settings) {
    res.json({
      settings: {
        userId,
        displayName: '',
        email: '',
        timezone: 'UTC',
        locale: 'en-US',
        notifications: { email: true, push: true, sms: false },
      },
    });
    return;
  }

  res.json({ settings });
});

// Update account settings
router.put('/', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const existing = settingsStore.get(userId);

  const updated: AccountSettings = {
    userId,
    displayName: req.body.displayName ?? existing?.displayName ?? '',
    email: req.body.email ?? existing?.email ?? '',
    timezone: req.body.timezone ?? existing?.timezone ?? 'UTC',
    locale: req.body.locale ?? existing?.locale ?? 'en-US',
    notifications: {
      email: req.body.notifications?.email ?? existing?.notifications?.email ?? true,
      push: req.body.notifications?.push ?? existing?.notifications?.push ?? true,
      sms: req.body.notifications?.sms ?? existing?.notifications?.sms ?? false,
    },
  };

  settingsStore.set(userId, updated);
  res.json({ settings: updated });
});

export default router;
