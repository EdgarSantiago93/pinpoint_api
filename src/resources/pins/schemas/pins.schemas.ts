import { z } from 'zod';

export const createPinSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  category: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  tagIds: z.array(z.string()).optional(),
  color: z.string().optional(),
  label: z.string().optional(), // Icon name
  placeId: z.string().optional(),
  types: z.array(z.string()).optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  country: z.string().optional(),
  aspects: z.array(z.string()).optional(), // Array of aspect IDs
  musts: z.array(z.string()).optional(), // Array of "must know" strings
});

export const updatePinSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  category: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  tagIds: z.array(z.string()).optional(),
});

export const pinQuerySchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radius: z.number().optional(),
  category: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
