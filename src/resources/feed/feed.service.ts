import { Injectable, Inject } from '@nestjs/common';
import { FeedResponse } from './types/feed.types';

@Injectable()
export class FeedService {
  constructor() {}

  // async getFeed(limit: number = 50, offset: number = 0): Promise<FeedResponse> {
  //   return {
  //     items: [],
  //     total: 0,
  //     limit: 0,
  //     offset: 0,
  //   };
  // }
}
