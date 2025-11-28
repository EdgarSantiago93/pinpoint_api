import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FeedRepository } from '@pinpoint/resources/feed/feed.repository';
import { PinSelectType } from '@pinpoint/resources/pins/types/pins.types';
import { FeedResponse } from './types/feed.types';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  @OnEvent('pin.created')
  async createFeedPost(pin: PinSelectType) {
    console.log('🟢🟢🟢🟢🟢🟢handlePinCreatedEvent', pin);
    if (!pin.id) {
      return null;
    }
    await this.feedRepository.createFeedPost(pin, 'pinned_place');
    // handle and process "OrderCreatedEvent" event
  }

  async getFeed(limit: number = 50, offset: number = 0): Promise<FeedResponse> {
    return await this.feedRepository.getFeedPosts(limit, offset);
  }
}
