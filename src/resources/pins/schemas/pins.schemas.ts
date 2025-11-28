import { z } from 'zod';

export const createPinSchema = z.object({
  description: z.string().optional(),
  tags: z.string().optional(),
  musts: z.array(z.string()).optional(),
  placeData: z
    .object({
      name: z.string(),
      address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      placeId: z.string(),
      types: z.array(z.string()),
      city: z.string().optional(),
      neighborhood: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  selectedColor: z.string().optional(),
  selectedIcon: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  aspects: z.array(z.string()).optional(), // Array of aspect IDs in the order the user arranged them
  media: z
    .array(
      z.object({
        uri: z.string(),
        type: z.enum(['image', 'video']),
      }),
    )
    .optional(),
  visitDate: z.union([z.date(), z.string()]).optional(),
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

export const nearbyPinsQuerySchema = z.object({
  latitude: z.string().transform((val) => Number(val)),
  longitude: z.string().transform((val) => Number(val)),
  radius: z
    .string()
    .transform((val) => Number(val))
    .optional()
    .default(5000), // Default 5km in meters
  limit: z
    .string()
    .transform((val) => Number(val))
    .optional()
    .default(50),
});

export const nearbyPinResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  color: z.string(),
  icon: z.string(),
});
