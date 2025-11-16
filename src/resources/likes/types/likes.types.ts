export type LikeResponse = {
  id: string;
  pinId: string;
  userId: string;
  createdAt: Date;
  user?: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
};

