import { z } from 'zod';
import { createTagSchema, popularTagsQuerySchema } from '../schemas/tags.schemas';

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type PopularTagsQueryInput = z.infer<typeof popularTagsQuerySchema>;

export type TagResponse = {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
  pinCount?: number;
};

