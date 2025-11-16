import { z } from 'zod';
import { feedQuerySchema } from '../schemas/feed.schemas';

export type FeedQueryInput = z.infer<typeof feedQuerySchema>;

export type FeedItem = {
  id: string;
  type: 'pin' | 'comment' | 'visit' | 'like' | 'rating';
  createdAt: Date;
  data: any;
};

export type FeedResponse = {
  items: FeedItem[];
  total: number;
  limit?: number;
  offset?: number;
};

