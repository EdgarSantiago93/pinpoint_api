import { z } from 'zod';

export const createMediaSchema = z.object({
  pinId: z.string(),
  type: z.enum(['image', 'video']),
});
