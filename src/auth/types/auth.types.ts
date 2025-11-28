import {
  createUserSchema,
  loginSchema,
  meQuerySchema,
  updateUserSchema,
  userResponseSchema,
  validateEmailSchema,
} from '@pinpoint/auth/schemas/auth.schemas';
import { users } from '@pinpoint/database/schema/userbase';
import { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type ValidateEmailInput = z.infer<typeof validateEmailSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// export type UserResponse = {
//   id: string;
//   email: string;
//   username: string;
//   name?: string;
//   avatar?: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

export type UserResponse = z.infer<typeof userResponseSchema>;

export type UserSelectType = InferSelectModel<typeof users>;

export type MeQueryInput = z.infer<typeof meQuerySchema>;
