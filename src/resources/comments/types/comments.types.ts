import { z } from 'zod';
import { createCommentSchema, updateCommentSchema } from '../schemas/comments.schemas';

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;

export type CommentResponse = {
  id: string;
  content: string;
  pinId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
};

