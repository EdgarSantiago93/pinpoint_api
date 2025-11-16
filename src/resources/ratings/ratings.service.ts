import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { CreateRatingInput, RatingResponse } from './types/ratings.types';

@Injectable()
export class RatingsService {
  constructor() {}

  // async createOrUpdate(
  //   pinId: string,
  //   userId: string,
  //   createRatingInput: CreateRatingInput,
  // ): Promise<RatingResponse> {
  //   return {
  //     id: '',
  //     pinId: '',
  //     userId: '',
  //     value: 0,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       id: '',
  //       username: '',
  //       name: '',
  //       avatar: '',
  //     },
  //   };
  // }

  // async getAverageRating(
  //   pinId: string,
  // ): Promise<{ average: number; count: number }> {
  //   return {
  //     average: 0,
  //     count: 0,
  //   };
  // }
}
