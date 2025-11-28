import { Inject, Injectable } from '@nestjs/common';
import * as schema from '@pinpoint/database/schema';
import { feedPosts } from '@pinpoint/database/schema/feedposts';
import { FeedResponse } from '@pinpoint/resources/feed/types/feed.types';
import { PinSelectType } from '@pinpoint/resources/pins/types/pins.types';
import { and, count, desc, eq } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

@Injectable()
export class FeedRepository {
  constructor(@Inject('DB') private db: LibSQLDatabase<typeof schema>) {}

  async createFeedPost(
    pin: PinSelectType,
    type: 'pinned_place' | 'visit',
  ): Promise<any> {
    console.log('CREATE FEED POST');
    return await this.db
      .insert(feedPosts)
      .values({
        placeId: pin.id,
        createdById: pin.createdById,
        type: type,
        userId: pin.createdById,
        status: 'approved',
      })
      .returning();

    // return post;
  }

  async getFeedPosts(
    limit: number = 50,
    offset: number = 0,
  ): Promise<FeedResponse> {
    // Get feed posts with pagination

    const posts = await this.db.query.feedPosts.findMany({
      where: and(eq(feedPosts.isDeleted, 0), eq(feedPosts.status, 'approved')),
      orderBy: desc(feedPosts.createdAt),
      limit: limit,
      offset: offset,
      with: {
        place: {
          columns: {
            id: true,
            title: true,
            description: true,
            address: true,
            color: true,
            icon: true,
            latitude: true,
            longitude: true,
            rating: true,
          },
        },
        user: {
          columns: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Get total count
    const [totalResult] = await this.db
      .select({ count: count() })
      .from(feedPosts)
      .where(and(eq(feedPosts.isDeleted, 0), eq(feedPosts.status, 'approved')));

    const total = totalResult?.count ?? 0;

    return {
      items: posts,
      total,
      limit,
      offset,
    };
  }
}
