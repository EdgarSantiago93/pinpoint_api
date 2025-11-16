import { z } from 'zod';

export const createVisitSchema = z.object({
  pinId: z.string(),
  visitedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});

