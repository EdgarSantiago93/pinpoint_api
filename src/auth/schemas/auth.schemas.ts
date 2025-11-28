import { validationMessages } from '@pinpoint/utils/validationMessages';
import { z } from 'zod';

export const validateEmailSchema = z.object({
  email: z.email({ message: validationMessages.email('email') }),
});

export const createUserSchema = z.object({
  email: z.email({ message: validationMessages.email('email') }),
  username: z.string().min(3, validationMessages.minLength('username', 3)),
  password: z.string().min(6, validationMessages.minLength('password', 6)),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email({ message: validationMessages.email('email') }),
  password: z.string().min(1, validationMessages.minLength('password', 1)),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  name: z.string().optional(),
  avatar: z.string().optional(),
  pins: z.number().optional(),
  collections: z.number().optional(),
  visitCount: z.number().optional(),
  wishlistCount: z.number().optional(),
});

export const meQuerySchema = z.object({
  pins: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  collections: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  visitCount: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  wishlistCount: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
});
