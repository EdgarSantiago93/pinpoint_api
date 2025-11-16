import { z } from 'zod';

export const feedQuerySchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

