import { z } from 'zod';
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
  userResponseSchema,
} from '@pinpoint/auth/schemas/auth.schemas';
import { InferSelectModel } from 'drizzle-orm';
import { users } from '@pinpoint/database/schema/userbase';

export type CreateUserInput = z.infer<typeof createUserSchema>;

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
