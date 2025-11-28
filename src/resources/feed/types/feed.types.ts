import { z } from 'zod';
import { feedQuerySchema } from '../schemas/feed.schemas';

export type FeedQueryInput = z.infer<typeof feedQuerySchema>;

export type FeedPostUser = {
  id: string;
  username: string | null;
  name: string | null;
  avatar: string | null;
};

export type FeedPostPlace = {
  id: string;
  title: string;
  description: string | null;
  address: string | null;
  color: string | null;
  icon: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
};

export type FeedPostItem = {
  id: string;
  type: string;
  userId: string;
  placeId: string;
  createdById: string;
  status: string;
  isDeleted: number;
  deletedAt: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: FeedPostUser | null;
  place: FeedPostPlace | null;
};

export type FeedResponse = {
  items: FeedPostItem[];
  total: number;
  limit: number;
  offset: number;
};
