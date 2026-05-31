import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { symbol } = req.query;

  const where: any = { userId };
  if (symbol && typeof symbol === 'string') {
    where.symbol = symbol.toUpperCase();
  }

  const notes = await prisma.note.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });

  res.json(notes);
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { symbol, content, tags } = req.body;

  if (!symbol || !content) {
    return res.status(400).json({ error: 'Symbol and content are required' });
  }

  const note = await prisma.note.create({
    data: {
      userId,
      symbol: symbol.toUpperCase(),
      content,
      tags: tags || [],
    },
  });

  res.status(201).json(note);
});

router.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { content, tags } = req.body;

  const note = await prisma.note.findFirst({
    where: { id, userId },
  });

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const updated = await prisma.note.update({
    where: { id },
    data: {
      ...(content !== undefined && { content }),
      ...(tags !== undefined && { tags }),
    },
  });

  res.json(updated);
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const note = await prisma.note.findFirst({
    where: { id, userId },
  });

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  await prisma.note.delete({ where: { id } });
  res.status(204).send();
});

export default router;
