import { z } from 'zod';
import { createRatingSchema } from '../schemas/ratings.schemas';

export type CreateRatingInput = z.infer<typeof createRatingSchema>;

export type RatingResponse = {
  id: string;
  pinId: string;
  userId: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
};

