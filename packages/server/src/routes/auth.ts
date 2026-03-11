import { Router, Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/database';
import { generateToken, authenticate } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = registerSchema.parse(req.body);

  const passwordHash = await bcrypt.hash(password, 12);

  // Use transaction to prevent race condition and ensure atomicity
  const user = await prisma.$transaction(async (tx) => {
    const existing = await tx.user.findUnique({ where: { email } });
    if (existing) {
      throw new AppError(409, 'Email already registered');
    }

    const newUser = await tx.user.create({
      data: { email, passwordHash, name },
    });

    // Create default portfolio, watchlist, and settings atomically
    await tx.portfolio.create({ data: { userId: newUser.id, name: 'My Portfolio' } });
    await tx.watchlist.create({ data: { userId: newUser.id, name: 'My Watchlist' } });
    await tx.userSettings.create({ data: { userId: newUser.id } });

    return newUser;
  });

  const token = generateToken({ userId: user.id, email: user.email });
  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
  });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError(401, 'Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new AppError(401, 'Invalid credentials');

  const token = generateToken({ userId: user.id, email: user.email });
  res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
  });
});

router.get('/me', authenticate, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: { id: true, email: true, name: true, createdAt: true },
  });
  res.json({ user });
});

export default router;
