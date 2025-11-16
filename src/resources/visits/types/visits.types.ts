import { z } from 'zod';
import { createVisitSchema } from '../schemas/visits.schemas';

export type CreateVisitInput = z.infer<typeof createVisitSchema>;

export type VisitResponse = {
  id: string;
  pinId: string;
  userId: string;
  visitedAt: Date;
  notes?: string;
  createdAt: Date;
  pin?: {
    id: string;
    title: string;
    address?: string;
  };
  user?: {
    id: string;
    username: string;
    name?: string;
  };
};

