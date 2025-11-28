import { pins } from '@pinpoint/database/schema';
import {
  createPinSchema,
  nearbyPinResponseSchema,
} from '@pinpoint/resources/pins/schemas/pins.schemas';
import { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';

export type CreatePinInput = z.infer<typeof createPinSchema>;

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

export type NearbyPinResponseType = z.infer<typeof nearbyPinResponseSchema>;

export type PinSelectType = InferSelectModel<typeof pins>;
