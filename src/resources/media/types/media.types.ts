import { z } from 'zod';
import { createMediaSchema } from '../schemas/media.schemas';

export type CreateMediaInput = z.infer<typeof createMediaSchema>;

export type MediaResponse = {
  id: string;
  url: string;
  type: string;
  pinId: string;
  uploadedById: string;
  createdAt: Date;
  uploadedBy?: {
    id: string;
    username: string;
    name?: string;
  };
};

