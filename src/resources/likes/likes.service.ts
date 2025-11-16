import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { LikeResponse } from './types/likes.types';

@Injectable()
export class LikesService {
  constructor() {}

  // async toggleLike(
  //   pinId: string,
  //   userId: string,
  // ): Promise<{ liked: boolean; like?: LikeResponse }> {
  //   return {
  //     liked: false,
  //     like: {
  //       id: '',
  //       pinId: '',
  //       userId: '',
  //       createdAt: new Date(),
  //       user: {
  //         id: '',
  //         username: '',
  //         name: '',
  //         avatar: '',
  //       },
  //     },
  //   };
  // }

  // async getLikeCount(pinId: string): Promise<number> {
  //   return 0;
  // }

  // async hasUserLiked(pinId: string, userId: string): Promise<boolean> {
  //   return false;
  // }
}
