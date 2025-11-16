import { z } from 'zod';
import { createPinSchema, updatePinSchema, pinQuerySchema } from '../schemas/pins.schemas';

export type CreatePinInput = z.infer<typeof createPinSchema>;
export type UpdatePinInput = z.infer<typeof updatePinSchema>;
export type PinQueryInput = z.infer<typeof pinQuerySchema>;

export type PinResponse = {
  id: string;
  title: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  rating?: number;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  tags?: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
};

